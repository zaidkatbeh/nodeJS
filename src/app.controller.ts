import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Query,
  Param,
} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@Body() requestBody: Body): string {
    console.log(requestBody.body);
    return `${this.appService.getHello()} zaid`;
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
