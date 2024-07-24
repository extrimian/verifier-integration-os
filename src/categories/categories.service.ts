import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import DBSchemas from 'src/domain/db/schemas.types';
import { ICategories } from 'src/domain/db/schemas/categories.schema';

@Injectable()
export class CategoriesService {
    constructor(
        @InjectModel(DBSchemas.CATEGORIES) private categoriesModel:Model<ICategories>
    ){}

    async getAllCategories():Promise<ICategories[]>{
        return await this.categoriesModel.find()
    }
    async getOneCategory(id:string):Promise<ICategories>{
        return await this.categoriesModel.findOne({id:id})
    }
    async createCategories(body:ICategories):Promise<ICategories>{
        return await new this.categoriesModel(body).save()
    }
    async updateCategories(id:string,body:ICategories):Promise<ICategories>{
        return await this.categoriesModel.findOneAndUpdate({id:id},{categories:body.categories})
    }
}
