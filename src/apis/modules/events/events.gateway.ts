import { Logger } from '@nestjs/common';
import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { EventsService } from './events.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class EventsGateway {
  constructor(private readonly eventsService: EventsService) {}

  private readonly logger = new Logger(EventsGateway.name);

  @WebSocketServer()
  private server: Server;

  @SubscribeMessage('events')
  handleEvent(@MessageBody() message: string): void {
    this.server.emit('events', message);
    this.logger.log(message);
  }
}
