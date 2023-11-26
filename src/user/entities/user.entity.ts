import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export class User {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({unique:true, length: 50})
    userName: string;

    @Column({unique: true})
    email: string;

    @Column()
    password: string;
}
