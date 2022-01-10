import { httpServer } from './http'
import './webSocket'

httpServer.listen(process.env.NODE_PORT, () => {
  console.log(`Servidor rodando na porta: ${process.env.NODE_PORT}`)
})