import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { SpendStatsQueryDto } from "src/spends/dto/spend-stats-query.dto";
import { Spend } from "src/spends/entities/spend.entity";
import { Repository } from "typeorm";

@Injectable()
export class GraphsService {
    constructor(
        @InjectRepository(Spend)
        private readonly spendRepo: Repository<Spend>,
    ) { }

    async spendsByCategory(query: SpendStatsQueryDto) {

    }

    async spendsByDay(query: SpendStatsQueryDto) {

    }

    async spendsByMember(query: SpendStatsQueryDto) {

    }
}
