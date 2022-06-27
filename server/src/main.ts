import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ConfigService} from "@nestjs/config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableShutdownHooks();

  const config = app.get(ConfigService);
  const port = config.get('SERVER_PORT');
  const host = config.get('SERVER_HOST');

  await app.listen(port, () => console.log(`Server started on http://${host}:${port}`));
}
bootstrap();
