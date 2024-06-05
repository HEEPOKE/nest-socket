import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import { configs } from './configs/configs';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.use(helmet());
  app.setGlobalPrefix('apis');

  await app.listen(configs.PORT);
}
bootstrap();
