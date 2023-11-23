import { Column, PrimaryGeneratedColumn } from "typeorm";

export class List {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({name:'name'})
    name: string;

    @Column({unique:true})
    test: string
}
