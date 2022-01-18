module.exports = (io) => {
    let users = []; // [{userId, socketId}...]

    io.on('connection', (socket) => {
        console.log('a socket connected')

        socket.on('addUser', (userId) => {
            !users.some(u => u.id === userId) && users.push({ userId, socketId: socket.id })
            io.emit('getUsers', users)
        })

        socket.on('sendMessage', ({ senderId, receiverId, message }) => {
            const user = users.find((u) => u.userId === receiverId)
            io.to(user.socketId).emit('getMessage', { senderId, message })
        })

        socket.on('disconnect', () => {
            console.log('a user disconnected')
            users = users.filter((u) => u.socketId !== socket.id);
            socket.emit('getUsers', users)
        })
    });
}