import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import Category from 'src/interfaces/Category.interface';
export declare class CategoriesService {
    categories: Category[];
    create(createCategoryDto: CreateCategoryDto): void;
    findAll(): Category[];
    findOne(id: number): Category | undefined;
    update(id: number, updateCategoryDto: UpdateCategoryDto): 1 | -1;
    remove(id: number): boolean;
    getCategoryIndex(id: number): number;
}
