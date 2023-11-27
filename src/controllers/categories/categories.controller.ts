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
} from '@nestjs/common';
import { Response } from 'express';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { FileValidationPipe } from 'src/pipes/file-validation/file-validation.pipe';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @UseInterceptors(FileInterceptor('category_picture',{
    // fileFilter(req, file, callback) {
    //   const allowedMiME = ['image/png', 'image/jpeg', 'image/jpg'];
    //   if (allowedMiME.includes(file.mimetype) && file.size <= 1024 * 1024 * 8) {
    //     callback(null, true);
    //   } else {
    //     callback (null, false);
    //   }
    // },
    storage: diskStorage({
      destination: `src/public/categoryImages/`,
      filename(req, file, callback) {
        const [fileName,fileMime] = file.originalname.split(".");
        const newFileName = `${fileName}${Date.now()}.${fileMime}`;
        callback(null, newFileName);
      }, 
    }),
  }))
    create(
    @Body() createCategoryDto: CreateCategoryDto,
    @UploadedFile(new FileValidationPipe(5000,['image/png','image/jpeg', 'image/jpg'])) category_picture: Express.Multer.File
    ): string {
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
