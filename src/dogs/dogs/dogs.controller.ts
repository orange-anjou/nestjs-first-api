import { BadRequestException, Body, Controller, Delete, Get, Header, HttpCode, HttpStatus, NotFoundException, Param, Patch, Post, Put } from '@nestjs/common';
import { DogsService, DogDto, Dog, addDogToList } from './dogs.service';

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
     * GET Method, only get the data of one dog
     * @param id number used to identify a specific dog
     * @returns data about the dog chosen in a json format
     */
    @Get('/:id')
    getDogWithId(@Param('id') id): Dog {
        if (!Number(id) || id < 0) {
            throw new BadRequestException({status: HttpStatus.BAD_REQUEST, error: 'Dog ID must be a positive number'});
        }

        let outputData = this.getAllDogs().find(dog => dog.id == id);

        if (!outputData) {
            throw new NotFoundException({status: HttpStatus.NOT_FOUND, error: `Dog with ID #${id} could not be found`});
        }

        return ;
    }

    /**
     * Post Method, create a new dog in the database in the "dogs" collection
     * @param newDogData data in json format used to create a new dog
     * @returns data about the dog just created in json format
     */
    @Post()
    createDog(@Body() newDogData: DogDto): Dog {
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
        if (!Number(id) || id < 0) {
            throw new BadRequestException({status: HttpStatus.BAD_REQUEST, error: 'Dog ID must be a positive number'});
        }

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
    updateDog(@Param('id') id: number, @Body() newDogData: DogDto) {
        if (!Number(id) || id < 0) {
            throw new BadRequestException({status: HttpStatus.BAD_REQUEST, error: 'Dog ID must be a positive number'});
        }
        
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
    patchDog(@Param('id') id: number, @Body() data: DogDto) {
        if (!Number(id) || id < 0) {
            throw new BadRequestException({status: HttpStatus.BAD_REQUEST, error: 'Dog ID must be a positive number'});
        }
        
        let storedDog = this.getDogWithId(id);
        for (let key in data) {
            storedDog[key] = data[key];
        }

        this.dogsService.updateDog(id, storedDog);

        return storedDog;
    }
}
