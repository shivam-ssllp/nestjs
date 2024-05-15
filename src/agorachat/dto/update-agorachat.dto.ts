import { PartialType } from '@nestjs/swagger';
import { CreateAgorachatDto } from './create-agorachat.dto';

export class UpdateAgorachatDto extends PartialType(CreateAgorachatDto) {}
