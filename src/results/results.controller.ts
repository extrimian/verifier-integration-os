import { Controller, Get, Res } from '@nestjs/common';
import { ResultsService } from './results.service';

@Controller('results')
export class ResultsController {
    constructor(
        private readonly resultsService: ResultsService,
    ) {}
    @Get('all')
    async getAllResults(@Res() res): Promise<any> {
        const results = await this.resultsService.getAllResults();
        return res.status(200).json(results);
    }
}
