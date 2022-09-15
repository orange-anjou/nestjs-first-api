import { IsAlpha, MinLength, MaxLength, IsInt, Min } from "class-validator";

export class CreateDogDTO {
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