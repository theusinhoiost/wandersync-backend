import { IsUUID, IsOptional, IsDateString } from 'class-validator';

export class SpendStatsQueryDto {
    @IsUUID()
    tripId: string;

    @IsOptional()
    @IsDateString()
    startDate?: string;

    @IsOptional()
    @IsDateString()
    endDate?: string;
}
