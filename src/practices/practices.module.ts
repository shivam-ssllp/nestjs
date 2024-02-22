import { Module } from '@nestjs/common';
import { PracticesService } from './practices.service';
import { PracticesController } from './practices.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Practices, PracticessModel } from './schema/practices.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Practices.name, schema: PracticessModel }])
  ],
  controllers: [PracticesController],
  providers: [PracticesService],
})
export class PracticesModule { }
