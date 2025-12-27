import { IsString, IsNumber } from 'class-validator';

export class SpendsByMemberDto {
    @IsString()
    name: string;

    @IsNumber()
    value: number;
}
