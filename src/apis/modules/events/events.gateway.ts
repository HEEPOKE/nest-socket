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
  private emittedMessages: string[] = [];

  @WebSocketServer()
  private server: Server;

  @SubscribeMessage('events')
  async handleEvent(@MessageBody() message: string) {
    this.server.emit('events', message);
    this.emittedMessages.push(message);
    this.logger.log(message);
  }

  @SubscribeMessage('get_events')
  async getEmittedMessages(): Promise<string[]> {
    this.logger.log(this.emittedMessages);
    return this.emittedMessages;
  }
}
