/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { ListModule } from './list/list.module';
import { TaskModule } from './task/task.module';
import { User } from './user/entities/user.entity';
import { List } from './list/entities/list.entity';
import { Task } from './task/entities/task.entity';

@Module({
  imports: [
    ListModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'to_do_using_nestJS',
      entities: [
        List,
        User,
        Task,
      ],
      // synchronize: true,
      // dropSchema: true,
    }),
    UserModule,
    TaskModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
