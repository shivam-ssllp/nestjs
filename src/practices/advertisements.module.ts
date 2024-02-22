import { Module } from '@nestjs/common';
import { AdvertisementsService } from './advertisements.service';
import { AdvertisementsController } from './advertisements.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Advertisements, AdvertisementsModel } from './schema/advertisements.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Advertisements.name, schema: AdvertisementsModel }])
  ],
  controllers: [AdvertisementsController],
  providers: [AdvertisementsService],
})
export class AdvertisementsModule { }
