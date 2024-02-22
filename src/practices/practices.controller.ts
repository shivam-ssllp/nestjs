import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { RealIP } from 'nestjs-real-ip';
import { PracticesService } from './practices.service';
import { CreatePracticeDto } from './dto/create-practice.dto';
import { UpdatePracticeDto } from './dto/update-practice.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("Practices")
@Controller('practices')
export class PracticesController {
  constructor(private readonly practicesService: PracticesService) { }

  @Post()
  find(@Body() createPracticeDto: CreatePracticeDto, @RealIP() ip: string) {
    return this.practicesService.create(createPracticeDto, ip);
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
  update(@Param('id') id: string, @Body() updatePracticeDto: UpdatePracticeDto) {
    return this.practicesService.update(+id, updatePracticeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.practicesService.remove(+id);
  }
}
