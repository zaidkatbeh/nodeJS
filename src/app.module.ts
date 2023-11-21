import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoriesModule } from './controllers/categories/categories.module';
import { UserModule } from './controllers/user/user.module';

@Module({
  imports: [CategoriesModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
