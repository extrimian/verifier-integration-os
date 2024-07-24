import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import DBSchemas from 'src/domain/db/schemas.types';
import { IVerification } from 'src/domain/db/schemas/invitation.schema';

@Injectable()
export class ResultsService {
    constructor(
        @InjectModel(DBSchemas.VERIFICATION_RESULT) private resultsModel: Model<IVerification>
    ){}

    async getAllResults(): Promise<IVerification[]> {
        return await this.resultsModel.find().exec();
    }
}
