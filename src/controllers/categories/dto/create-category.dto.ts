import { IsString, Length, ValidationArguments } from "class-validator";

export class CreateCategoryDto {
  @Length(3,10,{
    message:(arrgs: ValidationArguments): string => {
      if(arrgs.value.length < arrgs.constraints[0]) {
        return `input ${arrgs.property} must be at least ${arrgs.constraints[0]}`;
      } else {
        return `input ${arrgs.property} must be at most ${arrgs.constraints[1]}`;
      }
    }
  })
  name: string;
  // @Length(5,100)
  @IsString()
  test:string;
}
