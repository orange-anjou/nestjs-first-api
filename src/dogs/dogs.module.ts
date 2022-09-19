import { Module } from '@nestjs/common';
import { DogsService } from './dogs/dogs.service';
import { DogsController } from './dogs/dogs.controller';
// import { TypeOrmModule } from '@nestjs/typeorm'
import { Dog } from 'src/dogs/entity/Dog';

@Module({
  providers: [DogsService],
  controllers: [DogsController],
  // imports: [TypeOrmModule.forFeature([Dog]),]
})
export class DogsModule {}
