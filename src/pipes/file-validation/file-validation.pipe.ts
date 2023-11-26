import {
  ArgumentMetadata,
  Injectable,
  PipeTransform,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class FileValidationPipe implements PipeTransform {
  constructor(
    private readonly maxSize: number,
    private readonly AllowedMime: string[],
  ) {}
  transform(value: Express.Multer.File, metadata: ArgumentMetadata) {
    if (!value) {
      throw new BadRequestException('category picture is required');
    } else if (value.size > this.maxSize * 1024) {
      throw new BadRequestException(
        'category picture exceded the max size 5MB',
      );
    } else if (!this.AllowedMime.includes(value.mimetype)) {
      const allowedmime = this.AllowedMime.join(' ').replaceAll('image/', '');
      throw new BadRequestException(
        `MIME not allowed allower MIME are ${allowedmime}`,
      );
    } else {
      return value;
    }
  }
}
