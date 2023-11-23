import { Module } from '@nestjs/common';
import { ListModule } from './list/list.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { List } from './list/entities/list.entity';

@Module({
  imports: [
    ListModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3000,
      username: 'root',
      password: '',
      database: 'to_do_using_nestJS',
      entities: [
        List
      ],
      migrations: [],
      synchronize: true,
      migrationsTableName: 'migration',
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
