import { PipeTransform } from '@nestjs/common';
export declare class ToUpperCasePipe implements PipeTransform {
    transform(value: string): string;
}
