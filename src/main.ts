import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import AppConfigFactory from './config/AppConfigFactory';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const appConfigFactory = new AppConfigFactory();
  const appConfig = appConfigFactory.FromEnvVar();

  console.log('info', `Postgres connection Successful`);

  await app.listen(appConfig.port, () => {
    console.log('info', `Multi currency listening on port ${appConfig.port}`);
  });
}
bootstrap();
