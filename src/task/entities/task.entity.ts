/* eslint-disable prettier/prettier */
import { List } from 'src/list/entities/list.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  Column,
} from 'typeorm';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  // @ManyToOne(() => List, (list) => list.tasks)
  // list: List;

  @CreateDateColumn()
  created_at: string;

  @UpdateDateColumn()
  updated_at: string;

}
