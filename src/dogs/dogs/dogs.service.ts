import { Injectable } from '@nestjs/common';

import dogs from '../../../resources/dogs.json';

export default interface Dog {
    id: number;
    name: string;
    age: number;  
}

@Injectable()
export class DogsService {
    getAllDogs(): Dog[] {
        return dogs;
    }
}
