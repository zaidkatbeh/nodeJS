"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationExceptionFilterFilter = void 0;
const common_1 = require("@nestjs/common");
let ValidationExceptionFilterFilter = class ValidationExceptionFilterFilter {
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        const status = exception.getStatus();
        if (exception instanceof common_1.HttpException) {
            console.log("this is an unautharized exception");
        }
        response
            .status(status)
            .json({
            statusCode: status,
        });
    }
};
exports.ValidationExceptionFilterFilter = ValidationExceptionFilterFilter;
exports.ValidationExceptionFilterFilter = ValidationExceptionFilterFilter = __decorate([
    (0, common_1.Catch)()
], ValidationExceptionFilterFilter);
//# sourceMappingURL=validation-exception-filter.filter.js.map