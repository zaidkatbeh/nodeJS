import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Query,
  Param,
  Req,
} from '@nestjs/common';
import { AppService } from './app.service';
import { CategoriesService } from './controllers/categories/categories.service';
import { Request } from 'express';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly categorySerivce: CategoriesService,
  ) {}

  @Get()
  getHello(@Req() req: Request): string {
    console.log(req['test']);
    console.log(req.headers['test']);
    console.log(req.params);
    console.log(++this.appService.counter);
    return `${this.appService.getHello()}}`;
  }

  @Post('test/:middlename')
  @HttpCode(200)
  testFun(
    @Query('first_name') first_name: string,
    @Body() formBody: string[],
    @Param('middlename') middleName: string,
  ): string {
    return `hi ${first_name} ${middleName} ${formBody['last_name']}`;
  }
}
