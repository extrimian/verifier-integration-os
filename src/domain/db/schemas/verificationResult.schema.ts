import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ResultDocument = HydratedDocument<IResult>

@Schema()

export class IResult {
  @Prop({type: String, required: true})
  idInvitation: string;
  @Prop({type: Boolean, required: true})
  verification:boolean;
  @Prop({type: String, required: true})
  did:string;
  @Prop({type:String , required: true})
  venue:string;
  @Prop({type: String, required: true})
  message:string;
}

export const ResultSchema = SchemaFactory.createForClass(IResult)