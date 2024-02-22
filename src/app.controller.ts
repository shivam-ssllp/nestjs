import { Body, Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("/")
@Controller("")
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get("signin/metamask")
  async signInWithMetamask(@Body() { signature, message }: {
    signature: string,
    message: string
  }): Promise<string> {
    return await this.appService.signInWithMetamask(signature, message);
  }
}
