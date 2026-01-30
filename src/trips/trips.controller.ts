// src/trips/trips.controller.ts

import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { TripsService } from './trips.service';
import { TripStatsResponseDto } from './dto/trip-stats-response.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
@ApiTags('Viagens')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('trips')
export class TripsController {
    constructor(private readonly tripsService: TripsService) { }

    @Get(':id/stats')
    getTripStats(@Param('id') id: string): TripStatsResponseDto {
        return this.tripsService.getTripStats(id);
    }
}