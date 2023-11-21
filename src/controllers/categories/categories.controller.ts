import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto): string {
    this.categoriesService.create(createCategoryDto);
    return 'category added successfuly';
  }

  @Get()
  findAll() {
    return this.categoriesService.findAll();
  }

  @Get(':id')
  findOne(
    @Param('id') id: string,
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
