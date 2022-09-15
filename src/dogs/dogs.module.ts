import { Module } from '@nestjs/common';
import { Dog, DogsService } from './dogs/dogs.service';
import { DogsController } from './dogs/dogs.controller';
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  providers: [DogsService],
  controllers: [DogsController],
  imports: [TypeOrmModule.forFeature([Dog]),]
})
export class DogsModule {}
