import { Module } from '@nestjs/common';
import { ListModule } from './list/list.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { List } from './list/entities/list.entity';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { TaskModule } from './task/task.module';

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
      ],
      synchronize: true,
    }),
    UserModule,
    TaskModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
