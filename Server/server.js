const server = require('http').createServer()
const io = require('socket.io')(server)

const rooms = {};
const clients = {};

function clientInit(socket, clientObj){
    var clientId = socket.id;

    if(clients.hasOwnProperty(clientId)){
        console.log(clientId + ": Client Already Exist!");
        //return new Error(clientId + ": Client Already Exist!");
        return null;
    }else{
        clientObj.permLevel = 2;
        clientObj.roomId = null;
        clientObj.clientId = clientId;
        
        return clientObj;
    }
}

function roomInit(roomObj){
    var roomId = roomObj.roomId;
    if(rooms.hasOwnProperty(roomId)){
        console.log(roomId + ": Room Already Exist!");
        //return new Error(roomId + ": Room Already Exist!");
        return null;
    }else{
        roomObj.host = null;
        roomObj.users = {};
        roomObj.playlist = {};

        return roomObj;
    }
}

function createRoom(socket, hostObj, roomObj){
    hostObj = clientInit(socket, hostObj);
    roomObj = roomInit(roomObj);

    if(roomObj !== null){
        socket.join(roomObj.roomId);

        hostObj.permLevel = 0;
        hostObj.roomId = roomObj.roomId;
        clients[hostObj.clientId] = hostObj;

        roomObj.host = hostObj.clientId;
        roomObj.users[hostObj.clientId] = hostObj;
        
        rooms[roomObj.roomId] = roomObj;
        
        roomUsersUpdate(roomObj.roomId);
        console.log(hostObj.clientId + " created a room "+roomObj.roomId);
    }else{
        io.sockets.connected[socket.id].disconnect();
    }
}

function joinRoom(socket, roomId, clientObj){
    clientObj = clientInit(socket, clientObj);
    if(!rooms.hasOwnProperty(roomId)){
        //new Error(roomId + " Room Doesn't Exist!");
        console.log(roomId + " Room Doesn't Exist!");
        io.sockets.connected[socket.id].disconnect();
    }

    //if(!clients.hasOwnProperty(clientObj.clientId) || !rooms[roomId].users.hasOwnProperty(clientObj.clientId)){
    //    //new Error(roomId + " Room Doesn't Exist!");
    //    console.log(roomId + " Room Doesn't Exist!");
    //}

    if(clientObj !== null){
        clientObj.roomId = roomId;
        socket.join(roomId);

        clients[clientObj.clientId] = clientObj;
        rooms[roomId].users[clientObj.clientId] = clientObj;

        roomUsersUpdate(roomId);
        io.to(socket.id).emit('playlist update', rooms[roomId].playlist);
        console.log(clientObj.clientId + " joined a room "+roomId);
    }else{
        io.sockets.connected[socket.id].disconnect();
    }
}

function giveAdminPerm(socket, roomId, userId){
    if(clients[socket.id].permLevel === 0 && rooms[roomId].users.hasOwnProperty(userId)){
        if(clients[userId].permLevel === 2){
            clients[userId].permLevel = 1;
            rooms[roomId].users[userId].permLevel = 1;
            roomUsersUpdate(roomId);
        }else if(clients[userId].permLevel === 1){
            clients[userId].permLevel = 2;
            rooms[roomId].users[userId].permLevel = 2;
            roomUsersUpdate(roomId);
        }else{
            //new Error(userId + "is now admin");
            console.log(userId + "is now admin");
        }
    }else{
        //new Error("Unauthorized Operation or User Doesn't Exist");
        console.log("Unauthorized Operation or User Doesn't Exist");
        io.sockets.connected[socket.id].disconnect();
    }
}

function deleteUser(roomId, clientId){
    delete clients[clientId];
    delete rooms[roomId].users[clientId];
}

function clientLeft(socket){
    //clients[socket.id] = clients[socket.id] || {};
    //delete clients[socket.id]
    if(clients.hasOwnProperty(socket.id) && (rooms.hasOwnProperty(clients[socket.id].roomId) && 
                rooms[clients[socket.id].roomId].users.hasOwnProperty(socket.id))){

        var clientsRoomId = clients[socket.id].roomId;
        if(clients[socket.id].permLevel === 0){
            deleteUser(clientsRoomId, socket.id);
            for(var client in rooms[clientsRoomId].users){
                //io.sockets.sockets[client].leave(clientsRoomId);
                io.sockets.connected[client].disconnect();
                delete clients[client];
            }
            delete rooms[clientsRoomId];
        }else{
            deleteUser(clientsRoomId, socket.id);
            roomUsersUpdate(clientsRoomId);
        }
    }else{
        //new Error("Client or Room Doesn't Exist!");
        console.log("Client or Room Doesn't Exist!");
    }
}

function roomUsersUpdate(roomId){
    io.sockets.to(roomId).emit('users update', rooms[roomId].users);
}

function roomPlaylistUpdate(socket, roomId, playlistObjList){
    if(rooms.hasOwnProperty(roomId) && rooms[roomId].users.hasOwnProperty(socket.id) 
            && rooms[roomId].users[socket.id].permLevel <= 1){
    
        rooms[roomId].playlist = playlistObjList;
        socket.to(roomId).emit('playlist update', playlistObjList);
    }else{
        //new Error("Client Not Authorized or Room Doesn't Exist");
        console.log("Client Not Authorized or Room Doesn't Exist");
    }
}

function changeNickName(socket, roomId, new_nickName){
    if(rooms.hasOwnProperty(roomId) && rooms[roomId].users.hasOwnProperty(socket.id)){
        rooms[roomId].users[socket.id].nickName = new_nickName;
        clients[socket.id].nickName = new_nickName;
        roomUsersUpdate(roomId);
    }else{
        //new Error("Room or Client Doesn't Exist");
        console.log("Room or Client Doesn't Exist");
    }
}

io.on('connection', function (socket){
    console.log(socket.id + ' connected.');

    socket.on('disconnect', function(reason){
        console.log(socket.id + ' disconnected. ' + reason);
        clientLeft(socket);
    });

    socket.on('kick user', function(clientId){
        io.sockets.connected[clientId].disconnect();
    });

    socket.on('change nick', function(roomId, new_nickName){
        changeNickName(socket, roomId, new_nickName);
    });

    socket.on('give admin', function(roomId, userId){
        giveAdminPerm(socket, roomId, userId);
    });

    /*  */

    socket.on('create room', function(hostObj, roomObj){
        createRoom(socket, hostObj, roomObj);
    });

    socket.on('join room', function(roomId, clientObj){
        joinRoom(socket, roomId, clientObj);
    });

    /*  */

    socket.on('playlist', function(roomId, playlistObjList){
        roomPlaylistUpdate(socket, roomId, playlistObjList);
    });

    socket.on('player', function(roomId, eventObj){
        socket.to(roomId).emit('player', eventObj);
    });

});

server.listen(3300)