import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags } from '@nestjs/swagger';
import { SignUpDto } from './users/dto/user.dto';
import { UsersService } from './users/users.service';

@ApiTags()
@Controller("/")
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly userService: UsersService,
  ) { }

  @Post("signin/metamask")
  async signInWithMetamask(@Body() { signature, message, wallet_address }: {
    signature: string,
    message: string,
    wallet_address: string
  }): Promise<string> {
    return await this.appService.signInWithMetamask(signature, message, wallet_address);
  }

  @Post("signIn")
  signIn() {

  }

  @Post("SignUp")
  signUp(@Body() body: SignUpDto) {
    return this.userService.signUp(body)
  }
}
