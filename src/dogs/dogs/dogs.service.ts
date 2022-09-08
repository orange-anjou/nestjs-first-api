import { Injectable } from '@nestjs/common';

let dogs: Dog[];
dogs = [
    {
        "id": 0,
        "name": "bob",
        "age": 1
    },
]

export default interface Dog {
    id: number;
    name: string;
    age: number;  
}

export interface CreateDogModel {
    name: string;
    age: number;
}

@Injectable()
export class DogsService {
    getAllDogs(): Dog[] {
        return dogs;
    }
}


export function addDogToList(dog: Dog) {
    dogs.push(dog);
}