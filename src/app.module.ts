import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DogsModule } from './dogs/dogs.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dog } from './dogs/dogs/dogs.service';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    DogsModule,
    TypeOrmModule.forRoot({
      type: "mariadb",
      host: "localhost",
      port: 3306,
      username: "root",
      password: "my-secret-pw",
      database: "dog_api_db",
      entities: [Dog],
      synchronize: true,
    }),
  ],
})
export class AppModule {}
