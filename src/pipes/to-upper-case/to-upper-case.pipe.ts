import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ToUpperCasePipe implements PipeTransform {
  transform(value: string) {
    console.log(`pipe called for value ${value}`);
    
    return `${value}`.toUpperCase();
  }
}
