import { Injectable } from '@nestjs/common';

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
        // delete dogs[id];
    }

    updateDog(id: number, dogData: Dog): void {
        dogs[id] = dogData;
    }
}

export function addDogToList(dog: Dog) {
    dogs.push(dog);
}