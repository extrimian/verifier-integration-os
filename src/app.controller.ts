import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { AppService } from './app.service';
import { IverificationBody , IoobBody } from './domain/requestBodys';
import { IoobResponse } from './domain/responseService';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello():string {
    return "Vivito y coleando";
  };

  @Post('getOob')
  async getOob(@Body()body:IoobBody):Promise<IoobResponse>{
    return this.appService.getOob(body)
  };

  @Put('verification')
  async buisinessLogic(@Body() data:IverificationBody):Promise<any>{
    return await this.appService.buisinessLogic(data)
  }
  @Get('result/:id')
  async getResult(@Param('id') id:string):Promise<any>{
    return await this.appService.getResult(id)
  }
}
