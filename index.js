const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);

    let { DB } = require("mongquick");
const mongoSec = process.env.mongoSec

 const mdb = new DB(`mongodb+srv://xl83:${mongoSec}@cluster0.c2sln.mongodb.net/Cluster0?retryWrites=true&w=majority`);


const io = require("socket.io")(server, {
    cors: {
        origin: "https://serifonium.github.io"
    }
});

app.get('/', (req, res) => {
    res.send('server');
});

io.on('connection', async(socket) => {
  
  socket.on('sendData', async(data) => {
  if data.type == "signup" {
     var check =  await mdb.get(data.username)
     if (check == null) {

    } else {
    socket.emit("usernameTaken")
    }
  }
  
})

server.listen(process.env.PORT || 3000, () => {
    console.log('listening on *:3000');
})