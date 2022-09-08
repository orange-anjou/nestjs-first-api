import { Module } from '@nestjs/common';
import { DogsService } from './dogs/dogs.service';
import { DogsController } from './dogs/dogs.controller';

@Module({
  providers: [DogsService],
  controllers: [DogsController]
})
export class DogsModule {}
