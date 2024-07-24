import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type InvitationDocument = HydratedDocument<IVerification>

interface IverificationParams{
  available:Array<any>,
  eventName?:string,
  checkDate?:boolean,
}


@Schema()
export class IVerification {
  @Prop({type: String, required: true})
  idInvitation: string;
  @Prop({type: Object, required: true})
  verificationParams:IverificationParams;
}

export const InvitationSchema = SchemaFactory.createForClass(IVerification)