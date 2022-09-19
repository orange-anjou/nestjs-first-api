import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DogsModule } from './dogs/dogs.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dog } from './dogs/entity/Dog';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    DogsModule,
    // TypeOrmModule.forRoot(),
  ],
})
export class AppModule {}
