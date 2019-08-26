const server = require('http').createServer()
const io = require('socket.io')(server)

var rooms = [];

io.on('connection', function (socket){
    console.log(socket.id + ' connected.');
    //io.emit('this', { will: 'be received by everyone'});

    socket.on('private message', function (from, msg) {
    console.log('I received a private message by ', from, ' saying ', msg);
    });

    socket.on('create room', function (room, fn){
        fn(io.sockets.adapter.rooms[room]);
    });

    //{roomId: '', owner: 'client_id'}
    socket.on('join room', function(room){
        socket.join(room.roomId);
        rooms[room.roomId] = room;
        console.log(socket.id + ' joined to the room: ' + room);
        io.to(room).emit('user joined', socket.id + ' joined to the room: ' + room);
    });

    socket.on('leave room', function(room){
        socket.leave(room);
        console.log(socket.id + ' leaved from the room: ' + room);
        io.to(room).emit('user leaved', socket.id + ' leaved from the room: ' + room);
    });

    socket.on('client list', function(room){
        console.log(io.sockets.adapter.rooms[room]);
    });

    socket.on('disconnect', function () {
        console.log(socket.id + ' disconnected');
    });
});

server.listen(3300)