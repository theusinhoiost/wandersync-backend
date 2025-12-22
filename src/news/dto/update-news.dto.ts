import { OmitType, PartialType } from "@nestjs/mapped-types";
import { CreateNewsDto } from "./create-news.dto";

export class UpdateNewsDto extends PartialType(OmitType(CreateNewsDto, ['userId', 'id'])) { }