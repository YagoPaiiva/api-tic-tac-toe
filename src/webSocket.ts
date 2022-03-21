import { io } from "./http"
import { Socket } from 'socket.io'

let board = Array(9).fill("")
let select = !!Math.round(Math.random())

const currentPlayer = (select:Boolean) =>{
  return select ? "X" : "O"
}
interface RoomUser {
  socket_id: string,
  username: string, 
  room: string
}

const users: RoomUser[] = []

type Index = { 
  index: number
}


io.on('connection', (socket:Socket)=> {
  console.log(`id:${socket.id}`)
  
  socket.on('select_room', data => {

    socket.join(data.room)
    users.push({
      room: data.room,
      username: data.name,
      socket_id: socket.id
    })

    io.to(data.room).emit('message', 'olha aqui')
    const quantidadeDePessoasEmSala = io.sockets.adapter.rooms.get(data.room).size
  })
  
  
  socket.on('handleClick', (data:Index) =>{
    select = !select
    console.log(data)
    board[data.index] = currentPlayer(select)
    ObserverBoard(board, socket)
  })

  socket.on('restart', (data) =>{
    if(data) board = Array(9).fill("")
  })

  socket.on('disconnect', () =>{
    console.log('socket desconectado:', socket.id)
  })

  setInterval(()=>{
    socket.emit('board', board)
  },16)
})

const ObserverBoard = (board:Array<String>, socket:Socket) =>{
  const possibleWaysToWin = [
    [board[0], board[1], board[2]],
    [board[3], board[4], board[5]],
    [board[6], board[7], board[8]],

    [board[0], board[3], board[6]],
    [board[1], board[4], board[7]],
    [board[2], board[5], board[8]],

    [board[0], board[4], board[8]],
    [board[2], board[4], board[6]],
  ];

   possibleWaysToWin.forEach(cells =>{
    if(cells.every(cell => cell ==="O")) socket.emit('Winner',"O")
    if(cells.every(cell => cell ==="X")) socket.emit('Winner',"X")
    if(board.every(item => item !== "")) socket.emit('Winner',"E")
  });
}
