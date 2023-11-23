import { ArgumentMetadata, PipeTransform } from '@nestjs/common';
export declare class CreateNewCategoryValidationPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata): any;
}
