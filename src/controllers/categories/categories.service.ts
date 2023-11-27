/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import Category from 'src/interfaces/Category.interface';

@Injectable()
export class CategoriesService {
  categories: Category[] = [];
  create(createCategoryDto: CreateCategoryDto) {
    const category: Category = {
      id: this.categories[this.categories.length - 1]?.id + 1 ?? 1,
      ...createCategoryDto,
    };
    this.categories.push(category);
  }

  findAll(): Category[] {
    return this.categories;
  }

  findOne(id: number): Category | undefined {
    return this.categories.find((category) => category.id === id);
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const categoryIndex: number = this.getCategoryIndex(id);
    if (categoryIndex == -1) {
      return -1;
    }
    this.categories[categoryIndex] = {
      id: id,
      ...updateCategoryDto,
    };
    return 1;
  }

  remove(id: number) {
    const categoryIndex: number = this.getCategoryIndex(id);
    if (categoryIndex == -1) {
      return false;
    }
    this.categories.splice(categoryIndex, 1);
    return true;
  }

  getCategoryIndex(id: number): number {
    return this.categories.findIndex((category) => category.id == id);
  }
}
