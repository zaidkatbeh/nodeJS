import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoriesModule } from './controllers/categories/categories.module';
import { UserModule } from './controllers/user/user.module';
import { DenythisMiddleware } from './middlewares/denythis/denythis.middleware';

@Module({
  imports: [CategoriesModule, UserModule],
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
