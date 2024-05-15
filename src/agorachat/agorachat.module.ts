import { Module } from '@nestjs/common';
import { AgorachatService } from './agorachat.service';
import { AgorachatController } from './agorachat.controller';

@Module({
  controllers: [AgorachatController],
  providers: [AgorachatService],
})
export class AgorachatModule {}
