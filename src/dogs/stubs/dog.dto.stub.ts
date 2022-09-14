import { DogDTO } from "src/dogs/dto/dog.dto";

export const DogDTOStub = (): DogDTO => {
    return {
        id: 1,
        name: "doggy",
        age: 3
    }
}