const io = require('socket.io')()
const socketApi = {
    io: io,
}

io.on('connection', (socket) => {
    console.log('A user connected')
})

module.exports = socketApi