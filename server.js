const server = require('http').createServer()
const io = require('socket.io')(server)

var rooms = [];

io.on('connection', function (socket){
    console.log(socket.id + ' connected.');
    //io.emit('this', { will: 'be received by everyone'});

    socket.on('private message', function (from, msg) {
    console.log('I received a private message by ', from, ' saying ', msg);
    });

    socket.on('list room', function (room, fn){
        fn(io.sockets.adapter.rooms[room]);
    });

    socket.on('debug room', function(){
        //console.log(io.sockets.adapter.rooms[room.roomId]);
        console.log(rooms);
    });

    socket.on('debug room2', function(room, user){
        //console.log(io.sockets.adapter.rooms[room.roomId]);
        console.log(rooms[room].users[user]);
    });

    //{userId: , roomId, nickName, permission_level, }
    //0:Host, 1:Admin, 2:User
    socket.on('create room', function(room, host){
        room.users = {};
        socket.join(room.roomId);
        host.userId = socket.id;
        host.roomId = room.roomId;
        host.permission_level = 0;

        room.users[socket.id] = host;
        room.host =  socket.id;
        rooms[room.roomId] = room;
        console.log(socket.id + ' created a room: ' + room.roomId);

        io.sockets.to(room.roomId).emit('users update', rooms[room.roomId]);
    });

    //{roomId: '', owner: 'client_id'}
    //roomId : { roomId: 12345, users: {{userId:, roomId, nickName, permission_level}, {userId:, roomId, nickName, permission_level}}, host: '2ivNsZLc7uFpdxVoAAAA' }
    socket.on('join room', function(room, user){
        if(rooms[room.roomId]){
            user.permission_level = 2;
            user.userId = socket.id;
            user.roomId = room.roomId;
            rooms[room.roomId].users[socket.id] = user;
            socket.join(room.roomId);
            console.log(socket.id + ' joined to the room: ' + room.roomId);
            io.to(room).emit('user joined', socket.id + ' joined to the room: ' + room);
        }else{
            console.log('Chanel couldnt find');
        }

        io.sockets.to(room.roomId).emit('users update', rooms[room.roomId]);
    });

    socket.on('change host', function(room, user){
        if(rooms[room.roomId].host.id === socket.id){
            rooms[room.roomId].users[socket.id] = rooms[room.roomId].host;
            rooms[room.roomId].host = user;
            console.log(room.roomId + ' host changed. new host' + user.nickName);
        }
    });

    socket.on('leave room', function(room){
        socket.leave(room);
        console.log(socket.id + ' leaved from the room: ' + room);
        io.to(room).emit('user leaved', socket.id + ' leaved from the room: ' + room);
    });


    socket.on('change nickname', function(room, newNick){
        console.log('nickname changed');
        rooms[room].users[socket.id].nickName = newNick;
        io.sockets.to(room).emit('users update', rooms[room]);
    });

    socket.on('kick user', function(user){
        io.sockets.connected[user].disconnect();
    });

    socket.on('give admin perm', function(room, user){
        if(rooms[room].users[socket.id].permission_level === 0){
            if(rooms[room].users[user].permission_level == 2){
                rooms[room].users[user].permission_level = 1;
            }else{
                rooms[room].users[user].permission_level = 2;
            }
        }
        io.sockets.to(room).emit('users update', rooms[room]);
    });

    socket.on('client list', function(room){
        console.log(io.sockets.adapter.rooms[room]);
    });

    socket.on('disconnect', function(){
        console.log(socket.id + ' disconnected');
        var clRoom;
        Object.keys(rooms).forEach(function(key){
            if(rooms[key].users[socket.id]){
                clRoom = key;
                delete rooms[key].users[socket.id];
            }  
          });
          io.sockets.to(clRoom).emit('users update', rooms[clRoom]);
    });
});

server.listen(3300)