import { PartialType } from "@nestjs/mapped-types";
import { CreateNewsDto } from "./create-news.dto";
import { OmitType } from "@nestjs/swagger";
import { CreateUserDto } from "src/users/dto/create-user.dto";

export class UpdateNewsDto extends PartialType(OmitType(CreateUserDto, [])) {

}