import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import DBSchemas from 'src/domain/db/schemas.types';
import { CategoriesSchema } from 'src/domain/db/schemas/categories.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoriesController } from './categories.controller';

@Module({
  imports: [MongooseModule.forFeature([
    {name:DBSchemas.CATEGORIES , schema:CategoriesSchema}
  ])],
  controllers: [CategoriesController],
  providers: [CategoriesService]
})
export class CategoriesModule {}
