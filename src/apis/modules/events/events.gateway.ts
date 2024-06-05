import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { EventsService } from './events.service';

@WebSocketGateway({
  namespace: 'events',
  cors: {
    origin: '*',
  },
})
export class EventsGateway {
  constructor(private readonly eventsService: EventsService) {}

  @WebSocketServer()
  private server: Server;

  @SubscribeMessage('events')
  handleEvent(@MessageBody() message: string): void {
    this.server.emit('events', message);
    console.log('====================================');
    console.log(message);
    console.log('====================================');
  }
}
