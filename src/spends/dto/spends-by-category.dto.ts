import { IsString, IsNumber } from 'class-validator';

export class SpendsByCategoryDto {
    @IsString()
    name: string;

    @IsNumber()
    value: number;
}
