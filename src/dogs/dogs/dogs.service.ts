import { Injectable } from '@nestjs/common';
import { DogIdPositiveNumberException } from '../exceptions/dog-id-positive-number.exception';
import { PrimaryGeneratedColumn, Column, Entity, OneToOne } from '@nestjs/typeorm'

let dogs: Dog[];
dogs = [
    {
        "id": 1,
        "name": "Max",
        "age": 5,
        "personId": 3 
    },
    {
        "id": 2,
        "name": "doggo",
        "age": 5,
        "personId": 2
    },
    {
        "id": 3,
        "name": "dog",
        "age": 12,
        "personId": 4 
    },
]

@Entity()
export class Dog {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 50,
    })
    name: string;

    @Column("int")
    age: number;  

    @OneToOne(() => Number)
    personId: Number;
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