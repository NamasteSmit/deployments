import WebSocket , { WebSocketServer } from "ws";
import http from "http"
import { client } from "@repo/db/client";

const server = http.createServer(function(req , res){
    console.log(new Date() + " Recieved Request for " + req.url)
    res.end("hi there")
});

const wss = new WebSocketServer({server});

wss.on("connection" , async function connection (ws){
    ws.on('error', ()=>{
        console.log('error')
    })
   
      await client.user.create({
        data : {
            username : Math.random().toString(),
            password : Math.random().toString()
        }
      })

    ws.on('message' , function message(data , isBinary){

        wss.clients.forEach((client)=>{
            if(client.readyState===WebSocket.OPEN){
                client.send(data , {binary : isBinary})
            }
        })
    })

    ws.send("hi there connected to ws server")
})

server.listen(9000,()=>{
    console.log("ws server up")
})