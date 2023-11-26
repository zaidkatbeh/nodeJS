/* eslint-disable prettier/prettier */
import { IsString, Length, ValidationArguments } from "class-validator";

export class CreateCategoryDto {
  category_picture: Express.Multer.File;

  @Length(3, 10, {
    message: (arrgs: ValidationArguments): string => {
      if ( arrgs.value.length < arrgs.constraints[0]) {
        return `input ${arrgs.property} must be at least ${arrgs.constraints[0]}`;
      } else {
        return `input ${arrgs.property} must be at most ${arrgs.constraints[1]}`;
      }
    }
  })
  name: string;

  @IsString()
  test:string;
}
