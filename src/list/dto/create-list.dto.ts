import { IsNotEmpty, Length } from "class-validator";

export class CreateListDto {
    @Length(3,50)
    @IsNotEmpty()
    name:string
}
