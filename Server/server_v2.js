const server = require('http').createServer()
const io = require('socket.io')(server)

const rooms = {};
const clients = {};

function clientInit(clientObj){
    var clientId = clientObj.clientId;

    if(clients.hasOwnProperty(clientId)){
        return new Error(clientId + ": Client Already Exist!");
    }else{
        clientObj.permLevel = 2;
        clientObj.roomId = null;
        
        return clientObj;
    }
}

function roomInit(roomObj){
    var roomId = roomObj.roomId;
    if(rooms.hasOwnProperty(roomId)){
        return new Error(roomId + ": Room Already Exist!");
    }else{
        roomObj.host = null;
        roomObj.users = {};
        roomObj.playlist = {};

        return roomObj;
    }
}

function createRoom(socket, hostObj, roomObj){
    try{
        hostObj = clientInit(hostObj);
        roomObj = roomInit(roomObj);

        socket.join(roomObj.roomId);

        hostObj.permLevel = 0;
        hostObj.roomId = roomObj.roomId;
        clients[hostObj.clientId] = hostObj;

        roomObj.host = hostObj.clientId;
        roomObj.users[hostObj.clientId] = hostObj;
        
        rooms[roomObj.roomId] = roomObj;
        
        roomUsersUpdate(roomObj.roomId);
        console.log(hostObj.clientId + " created a room "+roomObj.roomId);

    }catch(e){
        console.log(e);
    }
}

function joinRoom(socket, roomId, clientObj){
    try{
        clientObj = clientInit(clientObj);
        if(!rooms.hasOwnProperty(roomId)){
            new Error(roomId + " Room Doesn't Exist!");
        }

        clientObj.roomId = roomId;
        socket.join(roomId);

        roomUsersUpdate(roomId);
        console.log(clientObj.clientId + " joined a room "+roomId);
    }catch(e){
        console.log(e);
    }
}

function giveAdminPerm(socket, roomId, userId){
    try{
        if(clients[socket.id].permLevel === 0 && rooms[roomId].users.hasOwnProperty(userId)){
            if(clients[socket.id].permLevel === 2){
                clients[socket.id].permLevel = 1;
                roomUsersUpdate(roomId);
            }else if(clients[socket.id].permLevel === 1){
                clients[socket.id].permLevel = 2;
                roomUsersUpdate(roomId);
            }else{
                new Error(userId + "is a host");
            }
        }else{
            new Error("Unauthorized Operation or User Doesn't Exist");
        }
    }catch(e){
        console.log(e);
    }
}

function leaved(socket){
    try{
        //clients[socket.id] = clients[socket.id] || {};
        //delete clients[socket.id]
        if(clients.hasOwnProperty(socket.id) && (rooms.hasOwnProperty(clients[socket.id].roomId))){
            var clientsRoomId = clients[socket.id].roomId;
            if(clients[socket.id].permLevel === 0){
                for(var client in rooms[clientsRoomId].users){
                    client.leave(clientsRoomId);
                    delete clients[client];
                }
                delete rooms[clientsRoomId];
            }else{
                delete rooms[clientsRoomId].users[socket.id];
                socket.id.leave(clientsRoomId);
            }
    
            delete clients[socket.id];
        }else{
            new Error("Client or Room Doesn't Exist!");
        }
    }catch(e){
        console.log(e);
    }
}

function roomUsersUpdate(roomId){
    io.sockets.to(roomId).emit('users update', rooms[roomId].users);
}

function roomPlaylistUpdate(socket, roomId, playlistObjList){
    try{
        if(rooms[roomId].hasOwnProperty(roomId) && rooms[roomId].users.hasOwnProperty(socket.id) 
                && rooms[roomId].users[socket.id].permLevel <= 1){
        
            rooms[roomId].playlist = playlistObjList;
            socket.to(roomId).emit('playlist update', playlistObjList);
        }else{
            new Error("Client Not Authorized or Room Doesn't exist");
        }
    }catch(e){
        console.log(e);
    }
}

function changeNickName(socket, roomId, new_nickName){
    try{
        rooms[roomId].users[socket.id].nickName = new_nickName;
        clients[socket.id].nickName = new_nickName;
    }catch(e){
        console.log(e);
    }
}

io.on('connection', function (socket){
    console.log(socket.id + ' connected.');

    socket.on('disconnect', function(){
        console.log(socket.id + ' disconnected.');
        leaved(socket);
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