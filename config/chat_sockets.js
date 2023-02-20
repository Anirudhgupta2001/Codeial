module.exports.chatSockets = function(socketServer){
    let io = require('socket.io')(socketServer);

    io.sockets.on('connection',function(socket){
        console.log('new connection recieved',socket.id )
    
        socket.on('disconnect',function(){
            console.log('Socket disconnected!');
        });

        socket.on('join_room',function(data){
            console.log('Joining request rec.',data);

            socket.join(data.chat.room);

            io.in(data.chatroom).emit('user_joined',data);
        })

        socket.on('send-mssage',function(data){
            io.in(data.chatroom).emit('receive-message',data);
        });
    });
    
}