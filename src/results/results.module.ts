import { Module } from '@nestjs/common';
import { ResultsService } from './results.service';
import { MongooseModule } from '@nestjs/mongoose';
import DBSchemas from 'src/domain/db/schemas.types';
import { ResultSchema } from 'src/domain/db/schemas/verificationResult.schema';
import { ResultsController } from './results.controller';

@Module({
  imports: [MongooseModule.forFeature([{name:DBSchemas.VERIFICATION_RESULT,schema:ResultSchema}])],
  controllers: [ResultsController],
  providers: [ResultsService],
})
export class ResultsModule {}
