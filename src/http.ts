import App from './app'
import  { Server } from 'socket.io'
import http from 'http'
import dotenv from 'dotenv'
dotenv.config()

const httpServer = http.createServer(App)

const io = new Server(httpServer, { 
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
})

export { httpServer, io  }
