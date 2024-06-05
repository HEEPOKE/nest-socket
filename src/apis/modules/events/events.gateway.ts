import { Controller } from '@nestjs/common';
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
@Controller('events')
export class EventsGateway {
  constructor(private readonly eventsService: EventsService) {}

  @WebSocketServer()
  private server: Server;

  @SubscribeMessage('event')
  handleEvent(@MessageBody() message: string): void {
    this.server.emit('event', message);
    console.log('====================================');
    console.log(message);
    console.log('====================================');
  }
}
