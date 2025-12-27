import {
    IsUUID,
    IsString,
    IsNumber,
    IsDateString,
    IsOptional
} from 'class-validator';

export class CreateSpendDto {
    @IsUUID()
    tripId: string;

    @IsUUID()
    userId: string;

    @IsOptional()
    @IsString()
    memberName?: string;

    @IsString()
    category: string;

    @IsNumber()
    amount: number;

    @IsDateString()
    spentAt: string;
}
