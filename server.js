const express = require('express')
const app = express()
const http = require('http').createServer(app)

const PORT = process.env.PORT || 3000

const path = require('path');

// Get the current directory using __dirname
const currentDir = __dirname;

// Navigate one level up to the parent directory
const parentDir = path.join(currentDir, '..');

// Access the "public" directory inside the parent directory
const clientDir = path.join(parentDir, 'client');

// Access the "index.html" file inside the "public" directory
const indexPath = path.join(clientDir, 'index.html');

console.log(indexPath);

http.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})

app.use(express.static(clientDir))

app.get('/', (req, res) => {
    res.sendFile(indexPath)
})

// Socket 
const io = require('socket.io')(http)

io.on('connection', (socket) => {
    console.log('Connected...')
    socket.on('message', (msg) => {
        socket.broadcast.emit('message', msg)
    })

})