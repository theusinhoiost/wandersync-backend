export class TripStatsResponseDto {
    byCategory: {
        id: string;
        label: string;
        value: number;
        color?: string;
    }[];

    byDay: {
        date: string; // formato ISO ou 'DD/MM'
        value: number;
    }[];

    byMember: {
        id: string;
        label: string;
        value: number;
        percentage: number;
    }[];
}