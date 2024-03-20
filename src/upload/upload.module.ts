import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { SharpModule } from 'nestjs-sharp';

@Module({
  imports: [SharpModule],
  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule {}
