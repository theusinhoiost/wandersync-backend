import { Controller, Get, Query } from "@nestjs/common";
import { SpendStatsQueryDto } from "src/spends/dto/spend-stats-query.dto";
import { GraphsService } from "./graphs.service";

@Controller('graphs')
export class GraphsController {
    constructor(private readonly graphsService: GraphsService) { }

    @Get('spends-by-category')
    getByCategory(@Query() query: SpendStatsQueryDto) {
        return this.graphsService.spendsByCategory(query);
    }

    @Get('spends-by-day')
    getByDay(@Query() query: SpendStatsQueryDto) {
        return this.graphsService.spendsByDay(query);
    }

    @Get('spends-by-member')
    getByMember(@Query() query: SpendStatsQueryDto) {
        return this.graphsService.spendsByMember(query);
    }
}
