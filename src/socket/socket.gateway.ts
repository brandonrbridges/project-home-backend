// Nest
import {
  ConnectedSocket,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets'

// Socket
import { Server, Socket } from 'socket.io'

@WebSocketGateway(null, {
  cors: {
    origin: '*',
  },
})
export class SocketGateway {
  @WebSocketServer() server: Server

  handleConnection(client: Socket) {
    console.log(`[SOCKET] Client connected: ${client.id}`)

    client.emit('connection', 'Successfully connected to the server')
  }

  handleDisconnect(client: Socket) {
    console.log(`[SOCKET] Client disconnected: ${client.id}`)
  }

  @SubscribeMessage('heartbeat')
  handleHeartbeat(@ConnectedSocket() client: Socket) {
    console.log(`[SOCKET] Heartbeat from client: ${client.id}`)

    client.emit('heartbeat', {
      message: 'heartbeat',
      data: {
        date: new Date(),
      },
    })
  }
}
