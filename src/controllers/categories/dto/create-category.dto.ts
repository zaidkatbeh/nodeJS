/* eslint-disable prettier/prettier */
import { IsString, Length, ValidationArguments } from "class-validator";

export class CreateCategoryDto {
  category_picture: string;
  @IsString()
  @Length(3, 10, {
    message: (arrgs: ValidationArguments): string => {
      if (!arrgs.value || arrgs.value.length < arrgs.constraints[0]) {
        return `input ${arrgs.property} must be at least ${arrgs.constraints[0]}`;
      } else {
        return `input ${arrgs.property} must be at most ${arrgs.constraints[1]}`;
      }
    }
  })

  name: string;


}
