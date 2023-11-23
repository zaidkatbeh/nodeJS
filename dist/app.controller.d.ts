import { AppService } from './app.service';
import { CategoriesService } from './controllers/categories/categories.service';
import { Request } from 'express';
export declare class AppController {
    private readonly appService;
    private readonly categorySerivce;
    constructor(appService: AppService, categorySerivce: CategoriesService);
    getHello(req: Request): string;
    testFun(first_name: string, formBody: string[], id: string, middleName: string): string;
}
