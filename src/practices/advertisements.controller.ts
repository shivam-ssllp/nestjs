import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { RealIP } from 'nestjs-real-ip';
import { AdvertisementsService } from './advertisements.service';
import { CreateAdvertisementsDto } from './dto/create-advertisements.dto';
import { UpdateAdvertisementsDto } from './dto/update-advertisements.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("Advertisements")
@Controller('advertisements')
export class AdvertisementsController {
  constructor(private readonly practicesService: AdvertisementsService) { }

  @Post()
  async create(@Body() createPracticeDto: CreateAdvertisementsDto, @RealIP() ip: string)
  // : Promise<string>
  {
    return await this.practicesService.create(createPracticeDto, ip);
  }

  @Get()
  findAll() {
    return this.practicesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.practicesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePracticeDto: UpdateAdvertisementsDto) {
    return this.practicesService.update(+id, updatePracticeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.practicesService.remove(+id);
  }
}
