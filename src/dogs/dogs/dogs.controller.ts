import { Body, Controller, Delete, Get, HttpCode, Param, Post } from '@nestjs/common';
import { DogsService, CreateDogModel } from './dogs.service';
import Dog from './dogs.service';
import { addDogToList } from './dogs.service';

@Controller('dogs')
export class DogsController {
    constructor(private readonly dogsService: DogsService) {}

    /** 
     * GET Method, retrieve a dictionary of all the dogs and their respective data
     */
    @Get()
    getAllDogs(): Dog[] {
        return this.dogsService.getAllDogs();
    }

    /** 
     * GET Method, only get the data from one dog
     */
    @Get('/:id')
    getDogWithId(@Param('id') id): Dog {
        return this.getAllDogs().find(dog => dog.id == id);
    }

    /** 
     * Post Method, create a new dog in the database in the "dogs" collection
     */
    @Post()
    createDog(@Body() newDogData: CreateDogModel): Dog {
        const newDog: Dog = {
            id: this.getAllDogs().length,
            name: newDogData.name,
            age: newDogData.age
        };

        addDogToList(newDog);

        return newDog;
    }

    @Delete(':id')
    @HttpCode(204)
    delete(@Param('id') id: number) {
        this.dogsService.delete(id);
    }

}
