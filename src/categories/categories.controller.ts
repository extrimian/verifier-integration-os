import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { ICategories } from 'src/domain/db/schemas/categories.schema';

@Controller('categories')
export class CategoriesController {
    constructor(private readonly catService: CategoriesService){}
    @Get('all')
    async getAll():Promise<any>{
        return await this.catService.getAllCategories()
    }
    @Get(':id')
    async getOne(@Param('id') id:string ):Promise<any>{
        return await this.catService.getOneCategory(id)
    }
    @Post('create')
    async create(@Body() body:ICategories):Promise<any>{
        return await this.catService.createCategories(body)
    }
    @Put('update')
    async update(@Body() body:ICategories):Promise<any>{
        return await this.catService.updateCategories(body.id,body)
    }
}
