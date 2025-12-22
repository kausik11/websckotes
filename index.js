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

   socket.on("chat message",(msg)=>{
    console.log("a user is connected for message: " + msg);

    io.emit('chat message', msg)
   })

   


  socket.on('disconnected', ()=>{
    console.log(`${socket.id} is disconnected`);
  })

  socket.on("hello", (a, b, c)=>{
    console.log(a);
    console.log(b);
    
  })
})

// io.emit('some event', 'hello world')

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
