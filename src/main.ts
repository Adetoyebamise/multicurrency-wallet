import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PostgresClient } from './database/postgres';
import AppConfigFactory from './config/AppConfigFactory';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const appConfigFactory = new AppConfigFactory();
  const appConfig = appConfigFactory.FromEnvVar();

  // const postgresClient = await PostgresClient({
  //   host: "localhost",
  //   dbname: "postgres",
  //   user: "postgres",
  //   password: "wallet",
  //   port: 5432,
  //   entities: [],
  // }); 

  console.log('info', `Postgres connection Successful`);

  await app.listen(appConfig.port, () => {
    console.log('info', `Multi currency listening on port ${appConfig.port}`);
  });
}
bootstrap();
