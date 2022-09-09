import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';

let dogs: Dog[];
dogs = [
    {
        "id": 0,
        "name": "bob",
        "age": 1
    },
]

export interface Dog {
    id: number;
    name: string;
    age: number;  
}

export interface DogDto {
    name: string;
    age: number;
}

@Injectable()
export class DogsService {
    getAllDogs(): Dog[] {
        return dogs;
    }

    deleteDog(id: number): void {
        dogs.splice(id, 1);
    }

    updateDog(id: number, dogData: Dog): void {
        dogs[id] = dogData;
    }
}

export function addDogToList(dog: Dog) {
    dogs.push(dog);
}

export function verifyDogId(id: number) {
    if (!Number(id) || id < 0) {
        throw new BadRequestException({status: HttpStatus.BAD_REQUEST, error: 'Dog ID must be a positive number'});
    }
}