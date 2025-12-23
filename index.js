import express from "express"
import {createServer} from "node:http"
import { fileURLToPath } from "node:url"
import { dirname, join } from "node:path"
import { Server } from "socket.io"



const app = express()
const server = createServer(app)
const port = 3000
const io = new Server(server)

const __dirname = dirname(fileURLToPath(import.meta.url));


app.get('/', (req, res) => {
  // res.send('<h1>Hello World!</h1>')
  res.sendFile(join(__dirname, 'index.html'))
})

io.on('connection',(socket)=>{
  console.log("a user is connected", socket.id);

  socket.on('message', (message)=>{
    console.log(message);
  })

   socket.on("chat message",(msg,ack)=>{
    console.log("a user send a chat message: " + msg);

    io.emit('chat message', msg)

    // acknowledgement to sender
    if (typeof ack === "function") {
      ack({
        status: "ok",
        message: "Message delivered",
        socketId: socket.id,
      });
    }
   })

   


  socket.on('disconnected', (msg)=>{
    console.log(`${socket.id} is disconnected`);
    io.emit('disconnected', `${socket.id} is disconnected`);
  })


  // socket.on('hello connect again', (arg1, arg2, arg3)=>{
  //     console.log("arg1: ", arg1);
  //     console.log("arg2: ", arg2);
  //     console.log("arg3: ", arg3);   
  // })


 
})

// io.emit('some event', 'hello world')

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
