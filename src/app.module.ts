/* eslint-disable prettier/prettier */
import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoriesModule } from './controllers/categories/categories.module';
import { UserModule } from './controllers/user/user.module';
import { DenythisMiddleware } from './middlewares/denythis/denythis.middleware';
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [
    CategoriesModule,
    UserModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      database: 'test',
      username: 'root',
      password: '',
      entities: [],
      synchronize: true
    }),
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(DenythisMiddleware)
      .forRoutes({ path: '/*', method: RequestMethod.GET });
  }
}
