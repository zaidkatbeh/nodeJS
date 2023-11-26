import {
    Column,
    PrimaryGeneratedColumn,
    Entity,
    CreateDateColumn,
    UpdateDateColumn
} from "typeorm";

@Entity({ name: 'list' })
export class List {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        unique: true,
        length: 50,
    })
    name: string;

    @CreateDateColumn()
    created_at: string

    @UpdateDateColumn()
    updated_at: string;

}
