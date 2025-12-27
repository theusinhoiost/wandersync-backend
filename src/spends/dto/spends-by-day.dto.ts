import { IsString, IsNumber } from 'class-validator';

export class SpendsByDayDto {
    @IsString()
    day: string;

    @IsNumber()
    gastos: number;
}
