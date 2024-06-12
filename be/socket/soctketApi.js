module.exports = (io) => {
    let users = []; // [{userId, socketId}...]

    io.on('connection', (socket) => {
        socket.on('addUser', (userId) => {
            !users.some(u => u.id === userId) && users.push({ userId, socketId: socket.id })
            //io.emit('getUsers', users)
        })

        socket.on('sendMessage', ({ data, receiverId }) => {
            const user = users.find((u) => u.userId === receiverId)
            user && io.to(user.socketId).emit('getMessage', data)
        })

        socket.on('disconnectSocket', () => {
            users = users.filter((u) => u.socketId !== socket.id);
            //socket.emit('getUsers', users)
        })

        socket.on('disconnect', () => {
            users = users.filter((u) => u.socketId !== socket.id);
            //socket.emit('getUsers', users)
        })
    });
}