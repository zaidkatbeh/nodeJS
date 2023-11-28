/* eslint-disable prettier/prettier */
import { Task } from 'src/task/entities/task.entity';
import {
  Column,
  PrimaryGeneratedColumn,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity({ name: 'list' })
export class List {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
    length: 50,
  })
  name: string;

  @OneToMany(()=>Task, (task) => task.list, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  tasks: Task[];

  @CreateDateColumn()
  created_at: string;

  @UpdateDateColumn()
  updated_at: string;
}
