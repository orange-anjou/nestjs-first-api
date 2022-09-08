import { Controller, Get, Param } from '@nestjs/common';
import { DogsService } from './dogs.service';
import Dog from './dogs.service';

@Controller('dogs')
export class DogsController {
    constructor(private readonly dogService: DogsService) {}

    @Get()
    getAllDogs(): Dog[] {
        return this.dogService.getAllDogs();
    }

    @Get('/:dogId')
        getDogWithId(@Param('dogId') dogId): Dog {
            return this.getAllDogs().find(dog => dog.id == dogId);
        }
}
