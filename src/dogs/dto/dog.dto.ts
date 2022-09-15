import { IsAlpha, IsInt, MaxLength, Min, MinLength } from 'class-validator';

export class DogDTO {
    @IsInt()
    @Min(1)
    id: number;

    @IsAlpha()
    @MinLength(2, {
        message: 'Name is too short',
    })
    @MaxLength(50, {
        message: "Name is too long",
    })
    name: string;
    
    @IsInt()
    @Min(1)
    age: number;

    @IsInt()
    @Min(1)
    personId: number;
}