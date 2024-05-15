import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AgorachatService } from './agorachat.service';
import { CreateAgorachatDto } from './dto/create-agorachat.dto';
import { UpdateAgorachatDto } from './dto/update-agorachat.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("Chat Token")
@Controller('agorachat')
export class AgorachatController {
  constructor(private readonly agorachatService: AgorachatService) { }

  @Post()
  create(@Body() createAgorachatDto: CreateAgorachatDto) {
    return this.agorachatService.create(createAgorachatDto);
  }

  @Get()
  findAll() {
    return this.agorachatService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.agorachatService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAgorachatDto: UpdateAgorachatDto) {
    return this.agorachatService.update(+id, updateAgorachatDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.agorachatService.remove(+id);
  }
}
