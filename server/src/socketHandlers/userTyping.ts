import { Socket } from "socket.io"

const registerTypingHandler = (socket: Socket) => {
  socket.on('user typing', (username: string, roomId: string) => {
    console.log(username, 'is typing in', roomId)
    socket.to(roomId).emit('user typing', username, roomId)
  })
}

export {registerTypingHandler}