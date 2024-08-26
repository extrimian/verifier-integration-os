import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import { config } from './config';
import { IoobBody, IBuisinessLogic } from './domain/requestBodys';
import { IoobResponse } from './domain/responseService';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IVerification } from './domain/db/schemas/invitation.schema';
import { IResult } from './domain/db/schemas/verificationResult.schema';
import DBSchemas from './domain/db/schemas.types';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(DBSchemas.INVITATION) private invitationModel:Model<IVerification>,
    @InjectModel(DBSchemas.VERIFICATION_RESULT) private resultsModel:Model<IResult>,
    ) {}

  async getOob(body:IoobBody):Promise<IoobResponse>{
    const ReqBody:IoobBody = {
      did:body.did,
      inputDescriptors:body.inputDescriptors,
    }
    const response = await axios.put(config.SSI_API_URL+'/v1/credentialsbbs/waci/oob/presentation',ReqBody);
    await this.saveInvitation(response.data.invitationId , body.verificationParams);
    return response.data
  }
  async saveInvitation(invitation:string , verificationParams:object):Promise<IVerification>{
    const invitationSaved = new this.invitationModel({
      idInvitation:invitation,
      verificationParams:verificationParams
    })
    return await invitationSaved.save()
  }
  async getInvitation(invitation:string):Promise<IVerification>{
    return await this.invitationModel.findOne({idInvitation:invitation})
  }
  async saveResult(invitation:string , result:boolean , did:string , venue:string , message:string):Promise<IResult>{
    const resultSaved = new this.resultsModel({
      idInvitation:invitation,
      venue:venue,
      verification:result,
      did:did,
      message:message
    })
    const saveMessage = await resultSaved.save();
    return saveMessage
  }
  async getResult(invitation:string):Promise<IResult>{
    return await this.resultsModel.findOne({idInvitation:invitation})
  }
  async buisinessLogic(data:IBuisinessLogic):Promise<any>{
      //here goes your buisiness logic
      return {
        result:true,
      }
    }

}
