import { Body, Controller, Delete, Get, Header, HttpCode, HttpStatus, NotFoundException, Param, Patch, Post, Put, RequestMapping } from '@nestjs/common';
import { DogsService, Dog, addDogToList, verifyDogId } from './dogs.service';
import { CreateDogDTO } from '../dto/create-dog.dto';
import { ApiHeader, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('dogs')
@Controller('dogs')
export class DogsController {
    constructor(private readonly dogsService: DogsService) {}

    /**
     * GET Method, retrieve a dictionary of all the dogs and their respective data
     * @returns data about all the dogs in json format
     */
    @ApiOperation({description: 'Get all dogs'})
    @ApiResponse({status: 200, description: 'Returns a list of dogs, each one in json format'})
    @ApiResponse({status: 404, description: 'Resource not found'})
    @Get()
    getAllDogs(): Dog[] {
        return this.dogsService.getAllDogs();
    }

    /**
     * GET Method, only get the data of one dog
     * @param id number used to identify a specific dog
     * @returns data about the dog chosen in a json format
     */
    @ApiOperation({description: 'Get dogs by ID'})
    @ApiResponse({status: 200, description: 'Returns the dog corresponding to the ID in json format'})
    @ApiResponse({status: 400, description: 'Dog ID must be a positive integer'})
    @ApiResponse({status: 404, description: 'Dog with the specified ID could not be found'})
    @ApiParam({name: "id", 
            required: true, 
            description: 'ID in the form of a positive Integer',
            example: '10'
    })
    @Get('/:id')
    getDogWithId(@Param('id') id): Dog {
        verifyDogId(id);

        let outputData = this.getAllDogs().find(dog => dog.id == id); // ou const

        if (!outputData) {
            throw new NotFoundException({status: HttpStatus.NOT_FOUND, error: `Dog with ID #${id} could not be found`});
        }

        return outputData;
    }

    /**
     * Post Method, create a new dog in the database in the "dogs" collection
     * @param newDogData data in json format used to create a new dog
     * @returns data about the dog just created in json format
     */
    @Post()
    createDog(@Body() newDogData: CreateDogDTO): Dog {
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
        verifyDogId(id);
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
    @Header('Content-Location', "/dogs/${@Param('id')}") // Verify that it works
    updateDog(@Param('id') id: number, @Body() newDogData: CreateDogDTO) {
        verifyDogId(id);
        
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
    patchDog(@Param('id') id: number, @Body() data: CreateDogDTO) {
        verifyDogId(id);
        
        let storedDog = this.getDogWithId(id);
        for (let key in data) { // const key
            storedDog[key] = data[key];
        }

        this.dogsService.updateDog(id, storedDog);

        return storedDog;
    }
}
