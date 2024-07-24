import { Module,  } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigProvider, config } from './config';
import {MongooseModule} from '@nestjs/mongoose'
import { InvitationSchema } from './domain/db/schemas/invitation.schema';
import { ResultSchema } from './domain/db/schemas/verificationResult.schema';
import DBSchemas from './domain/db/schemas.types';
import { CategoriesModule } from './categories/categories.module';
import { ResultsModule } from './results/results.module';

@Module({
  imports: [
    MongooseModule.forRoot(config.MONGO_URL),
    MongooseModule.forFeature([
      {name:DBSchemas.INVITATION,schema:InvitationSchema},
      {name:DBSchemas.VERIFICATION_RESULT , schema:ResultSchema}
    ]),
    CategoriesModule,
    ResultsModule
  ],
  controllers: [AppController],
  providers: [AppService ,ConfigProvider],
})

export class AppModule {}
