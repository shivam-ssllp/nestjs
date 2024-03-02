import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { BraucherMailDto } from './users/dto/user.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Post()
  sendMail() {
    return this.appService.sendMail();
  }

  @Post('broucher')
  braucherMail(@Body() body: BraucherMailDto) {
    return this.appService.braucherMail(body);
  }
}
