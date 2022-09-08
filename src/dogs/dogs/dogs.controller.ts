import { Body, Controller, Delete, Get, Header, HttpCode, Param, Patch, Post, Put } from '@nestjs/common';
import { DogsService, CreateDogModel } from './dogs.service';
import Dog from './dogs.service';
import { addDogToList } from './dogs.service';

@Controller('dogs')
export class DogsController {
    constructor(private readonly dogsService: DogsService) {}

    /**
     * GET Method, retrieve a dictionary of all the dogs and their respective data
     * @returns data about all the dogs in json format
     */
    @Get()
    getAllDogs(): Dog[] {
        return this.dogsService.getAllDogs();
    }

    /**
     * GET Method, only get the data from one dog
     * @param id number used to identify a specific dog
     * @returns data about the dog chosen in a json format
     */
    @Get('/:id')
    getDogWithId(@Param('id') id): Dog {
        return this.getAllDogs().find(dog => dog.id == id);
    }

    /**
     * Post Method, create a new dog in the database in the "dogs" collection
     * @param newDogData data in json format used to create a new dog
     * @returns data about the dog just created in json format
     */
    @Post()
    createDog(@Body() newDogData: CreateDogModel): Dog {
        let dogList = this.getAllDogs();
        const newDog: Dog = {
            id: dogList[dogList.length-1].id + 1,
            name: newDogData.name,
            age: newDogData.age
        };

        addDogToList(newDog);

        return newDog;
    }

    /**
     * DELETE method : delete a dog by using it's id
     * @param id number used to identify a specific dog
     */
    @Delete(':id')
    @HttpCode(204)
    deleteDog(@Param('id') id: number) {
        this.dogsService.deleteDog(id);
    }

    /**
     * PUT method : update an already existing dog by specifying it's id
     * All the data necesary to the creation of a dog must be present in the request body.
     * @param id
     * @param newDogData 
     * @returns 
     */
    @Put(':id')
    @HttpCode(200)
    @Header('Content-Location', '/dogs') // Can't find a way to specify the id in the path...
    updateDog(@Param('id') id: number, @Body() newDogData: CreateDogModel) {
        const newDog: Dog = {
            id: id,
            name: newDogData.name,
            age: newDogData.age
        };

        this.dogsService.updateDog(id, newDog);

        return newDog;        
    }

    /**
     * PATCH method : update an already exising dog by specifying it's id
     * One, or many, attributes can be updated at the same. The request does not need to contain all the data about a dog.
     * @param id 
     * @param data 
     * @returns 
     */
    @Patch(':id')
    @HttpCode(200)
    patchDog(@Param('id') id: number, @Body() data: CreateDogModel) {
        let storedDog = this.getDogWithId(id);
        for (let key in data) {
            storedDog[key] = data[key];
        }

        this.dogsService.updateDog(id, storedDog);

        return storedDog;
    }
}
