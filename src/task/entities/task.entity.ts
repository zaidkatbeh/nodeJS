import {
     Entity,
     PrimaryGeneratedColumn,
     CreateDateColumn,
     UpdateDateColumn ,
    } from "typeorm";

@Entity()
export class Task {
    @PrimaryGeneratedColumn()
    id: number;

    list_id: number;

    @CreateDateColumn()
    created_at: string

    @UpdateDateColumn()
    updated_at: string;

}
