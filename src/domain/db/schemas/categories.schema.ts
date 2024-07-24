import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type Categories = HydratedDocument<ICategories>

@Schema()

export class ICategories {
  @Prop({type: String, required: true})
  id: string;
  @Prop({type: Array<string>, required: true})
  categories:Array<string>;
}

export const CategoriesSchema = SchemaFactory.createForClass(ICategories)