/* eslint-disable prettier/prettier */

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  ParseIntPipe,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { Response } from 'express';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @UseInterceptors(FileInterceptor('category_picture',{
    fileFilter(req, file, callback) {
      const allowedMiME = ['image/png', 'image/jpeg', 'image/jpg'];
      if (!allowedMiME.includes(file.mimetype)) {
        callback (new BadRequestException("unallowed MIME"), false);
      } else if(file.size <= 1024 * 1024 * 8) {
        callback (new BadRequestException("maximum size allowed is 8 MB"), false);
      } else {
        callback(null, true);
      }
    },
    storage: diskStorage({
      destination: `src/public/categoryImages/`,
      filename(req, file, callback) {
        const fileMiMe = file.mimetype.split("/")[1];
        const newFileName = `${req.body["name"].trim()}${Date.now()}.${fileMiMe}`;        
        callback(null, newFileName);
      }, 
    }),
  }))
    create(
    @Body() createCategoryDto: CreateCategoryDto,
    @UploadedFile() category_picture: Express.Multer.File
    ): string {
      createCategoryDto.category_picture = category_picture.filename;
    this.categoriesService.create(createCategoryDto);
    return 'category added successfuly';
  }

  @Get()
  findAll() {
    return this.categoriesService.findAll();
  }

  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe) id: string,
    @Res({ passthrough: true }) response: Response,
  ) {
    const category = this.categoriesService.findOne(+id);
    if (category) {
      response.statusCode = 200;
      return response.json({
        category: category,
      });
    }
    response.statusCode = 404;
    return response.json({
      message: 'category not found',
    });
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const result: 1 | -1 = this.categoriesService.update(
      +id,
      updateCategoryDto,
    );
    if (result == -1) {
      response.statusCode = 404;
      return response.json({
        message: 'category not found',
      });
    }
    response.statusCode = 200;
    return response.json({
      message: 'category updated',
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Res() response: Response) {
    const result: boolean = this.categoriesService.remove(+id);
    if (result) {
      response.statusCode = 200;
      return response.json({
        message: 'category deleted',
      });
    }

    response.statusCode = 404;
    return response.json({
      message: 'category not found',
    });
  }
}
