import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from "typeorm";

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