import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { AppService } from './app.service';
import { IBuisinessLogic , IoobBody } from './domain/requestBodys';
import { IoobResponse } from './domain/responseService';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello():string {
    return "Pong";
  };

  @Post('getOob')
  async getOob(@Body()body:IoobBody):Promise<IoobResponse>{
    return this.appService.getOob(body)
  };

  @Put('buisinessLogic')
  async buisinessLogic(@Body() data:IBuisinessLogic):Promise<{ result: true } | { result: false, rejectMessage: string }>{
    return await this.appService.buisinessLogic(data)
  };
  @Get('result/:id')
  async getResult(@Param('id') id:string):Promise<any>{
    return await this.appService.getResult(id)
  }
}
