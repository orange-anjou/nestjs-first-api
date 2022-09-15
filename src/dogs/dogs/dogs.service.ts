import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { DogIdPositiveNumberException } from '../exceptions/dog-id-positive-number.exception';

let dogs: Dog[];
dogs = [
    {
        "id": 0,
        "name": "bob",
        "age": 1
    },
    {
        "id": 1,
        "name": "doggy",
        "age": 5
    },
    {
        "id": 2,
        "name": "doggo",
        "age": 5
    },
    {
        "id": 3,
        "name": "dog",
        "age": 12
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

    getAllDogsByAge(age: Number): Dog[] {
        let dogList = [];
        for (let dog of dogs) {
            if (dog.age == age) {
                dogList.push(dog);
            }
        }
        return dogList;
    }

    deleteDog(id: number): void {
        dogs.splice(id, 1);
    }

    updateDog(id: number, dogData: Dog): void {
        dogs[id] = dogData;
    }

    addDogToList(dog: Dog) {
        dogs.push(dog);
    }
}

export function verifyDogId(id: number) {
    if (!Number.isInteger(id) && id < 0) {
        throw new DogIdPositiveNumberException;
    }
}