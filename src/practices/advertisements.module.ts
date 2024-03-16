import { Module } from '@nestjs/common';
import { AdvertisementsService } from './advertisements.service';
import { AdvertisementsController } from './advertisements.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Advertisements, AdvertisementsModel } from './schema/advertisements.schema';
import { DbModule } from 'src/db/db.module';

@Module({
  imports: [DbModule],
  controllers: [AdvertisementsController],
  providers: [AdvertisementsService],
})
export class AdvertisementsModule { }
