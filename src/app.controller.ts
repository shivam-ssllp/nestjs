import { Body, Controller, Get, Patch, Post, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { SignUpDto } from './users/dto/user.dto';
import { UsersService } from './users/users.service';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from './auth/auth.guard';

@ApiTags()
@Controller("/")
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly userService: UsersService,
    private readonly authService: AuthService,
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

  @Post("signUp")
  signUp(@Body() body: SignUpDto) {
    return this.userService.signUp(body)
  }

  @ApiBearerAuth('authentication')
  @UseGuards(AuthGuard)
  @Patch('verify-mail')
  verifyEmail() {

  }

  @ApiBearerAuth('authentication')
  @UseGuards(AuthGuard)
  @Patch('verify-phone')
  verifyPhone() {

  }
}
