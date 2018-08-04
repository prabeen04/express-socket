const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

//localhot port
const port = 4001

const app = express()

// our server instance
const server = http.createServer(app)

// This creates our socket using the instance of the server
const io = socketIO(server)

app.get('/', (req, res) => {
    res.send('Welcome to websocket world')
})

// This is what the socket.io syntax is like, we will work this later
io.on('connection', socket => {``
    console.log('User connected')

    socket.on('disconnect', () => {
        console.log('user disconnected')
    })
})

server.listen(port, () => console.log(`Listening on port ${port}`))