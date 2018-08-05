const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const mongoDB_URL = require('./config/config').mongodbURL;
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
io.on('connection', socket => {
    console.log(socket.id)
    socket.on('SEND_MESSAGE', (message) => {
        console.log(message)
        io.emit('RECEIVE_MESSAGE', message)
    })
    socket.on('TYPING', (user) => {
        console.log(user)
        socket.broadcast('TYPING', user)
    })
    socket.on('disconnect', () => {
        console.log('user disconnected')
    })
})

server.listen(port, () => console.log(`Listening on port ${port}`))