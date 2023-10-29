import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PostgresClient } from './database/postgres'
import AppConfigFactory from './config/AppConfigFactory';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const appConfigFactory = new AppConfigFactory()
  const appConfig = appConfigFactory.FromEnvVar()

  const postgresClient = await PostgresClient({
    host: appConfig.sql.host,
    dbname: appConfig.sql.dbname,
    user: appConfig.sql.user,
    password: appConfig.sql.password,
    port: appConfig.sql.port,
    entities: appConfig.typeorm.entities
})

console.log('info', `Postgres connection Successful`);

  await app.listen(3000);

}
bootstrap();
