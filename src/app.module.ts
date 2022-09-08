import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DogsModule } from './dogs/dogs.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [DogsModule],
})
export class AppModule {}
