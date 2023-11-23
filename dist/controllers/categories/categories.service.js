"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriesService = void 0;
const common_1 = require("@nestjs/common");
let CategoriesService = class CategoriesService {
    constructor() {
        this.categories = [
            {
                id: 1,
                name: 'food',
            },
        ];
    }
    create(createCategoryDto) {
        const category = {
            id: this.categories[this.categories.length - 1].id + 1,
            ...createCategoryDto,
        };
        this.categories.push(category);
    }
    findAll() {
        return this.categories;
    }
    findOne(id) {
        return this.categories.find((category) => category.id === id);
    }
    update(id, updateCategoryDto) {
        const categoryIndex = this.getCategoryIndex(id);
        if (categoryIndex == -1) {
            return -1;
        }
        this.categories[categoryIndex] = {
            id: id,
            ...updateCategoryDto,
        };
        return 1;
    }
    remove(id) {
        const categoryIndex = this.getCategoryIndex(id);
        if (categoryIndex == -1) {
            return false;
        }
        this.categories.splice(categoryIndex, 1);
        return true;
    }
    getCategoryIndex(id) {
        return this.categories.findIndex((category) => category.id == id);
    }
};
exports.CategoriesService = CategoriesService;
exports.CategoriesService = CategoriesService = __decorate([
    (0, common_1.Injectable)()
], CategoriesService);
//# sourceMappingURL=categories.service.js.map