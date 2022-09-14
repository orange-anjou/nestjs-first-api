import { IsInt, Min } from 'class-validator';

export class DogDTO {
    @IsInt()
    @Min(0)
    id: number;

    name: string;
    
    @IsInt()
    @Min(1)
    age: number;
}