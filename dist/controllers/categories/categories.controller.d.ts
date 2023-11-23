import { Response } from 'express';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
export declare class CategoriesController {
    private readonly categoriesService;
    constructor(categoriesService: CategoriesService);
    create(createCategoryDto: CreateCategoryDto): string;
    findAll(): import("../../interfaces/Category.interface").default[];
    findOne(id: string, response: Response): Response<any, Record<string, any>>;
    update(id: string, updateCategoryDto: UpdateCategoryDto, response: Response): Response<any, Record<string, any>>;
    remove(id: string, response: Response): Response<any, Record<string, any>>;
}
