import { PartialType } from '@nestjs/swagger';
import { CreateAdvertisementsDto } from './create-advertisements.dto';

export class UpdateAdvertisementsDto extends PartialType(CreateAdvertisementsDto) { }
