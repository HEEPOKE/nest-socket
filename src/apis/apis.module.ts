import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { globalConfig } from 'src/configs/configs';
import { EventsModule } from './modules/events/events.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      envFilePath: '.env',
      load: [globalConfig],
    }),
    EventsModule,
  ],
  providers: [],
})
export class ApisModule {}
