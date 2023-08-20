// Nest
import { Module } from '@nestjs/common'

// Gateways
import { SocketGateway } from './socket.gateway'

@Module({
  providers: [SocketGateway],
})
export class SocketModule {}
