"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const app_service_1 = require("./app.service");
const categories_service_1 = require("./controllers/categories/categories.service");
const to_upper_case_pipe_1 = require("./pipes/to-upper-case/to-upper-case.pipe");
let AppController = class AppController {
    constructor(appService, categorySerivce) {
        this.appService = appService;
        this.categorySerivce = categorySerivce;
    }
    getHello(req) {
        console.log(req['test']);
        console.log(req.headers['test']);
        console.log(req.params);
        console.log(++this.appService.counter);
        return `${this.appService.getHello()}}`;
    }
    testFun(first_name, formBody, id, middleName) {
        return `hi ${first_name} ${middleName} ${formBody['last_name']}`;
    }
};
exports.AppController = AppController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", String)
], AppController.prototype, "getHello", null);
__decorate([
    (0, common_1.Post)('test/:id/:middlename'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Query)('first_name')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Param)('id', common_1.ParseIntPipe, to_upper_case_pipe_1.ToUpperCasePipe)),
    __param(3, (0, common_1.Param)('middlename')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Array, String, String]),
    __metadata("design:returntype", String)
], AppController.prototype, "testFun", null);
exports.AppController = AppController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [app_service_1.AppService,
        categories_service_1.CategoriesService])
], AppController);
//# sourceMappingURL=app.controller.js.map