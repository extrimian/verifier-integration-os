import * as dotenv from 'dotenv';
dotenv.config();
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CONFIG ,Configuration} from './config';
import { Logger } from '@nestjs/common';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get<Configuration>(CONFIG);
  app.enableCors();
  await app.listen(config.PORT);
  Logger.log(`Server started on port ${config.PORT}`);
  Logger.log(`SSI_API_URL: ${config.SSI_API_URL}`);
}
bootstrap();
