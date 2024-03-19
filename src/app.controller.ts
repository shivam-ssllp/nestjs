import { Body, Controller, Delete, Get, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiBearerAuth, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { OtpDto, SignInDto, SignUpDto } from './users/dto/user.dto';
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

  @ApiConsumes('application/json', 'application/x-www-form-urlencoded')
  @Post("signIn")
  signIn(@Body() body: SignInDto) {
    return this.authService.signIn(body)
  }

  @ApiConsumes('application/json', 'application/x-www-form-urlencoded')
  @Post("signUp")
  signUp(@Body() body: SignUpDto) {
    return this.userService.signUp(body)
  }

  @ApiBearerAuth('authentication')
  @UseGuards(AuthGuard)
  @ApiConsumes('application/json', 'application/x-www-form-urlencoded')
  @Patch('verify-mail')
  async verifyEmail(@Body() body: OtpDto, @Request() req: any) {
    const types = 'email'
    return await this.authService.verifyOtp(body, types, req.user.id)
  }

  @ApiBearerAuth('authentication')
  @UseGuards(AuthGuard)
  @ApiConsumes('application/json', 'application/x-www-form-urlencoded')
  @Patch('verify-phone')
  async verifyPhone(@Body() body: OtpDto, @Request() req: any) {
    const types = 'phone'
    return await this.authService.verifyOtp(body, types, req.user.id)
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth('authentication')
  @ApiOperation({ summary: 'logout' })
  @ApiConsumes('application/json', 'application/x-www-form-urlencoded')
  @Delete('/logout')
  logOut(@Request() req) {
    let tok = req?.headers?.authorization?.split(' ') ?? null
    return this.authService.logOut(req.user.id, tok[1])
  }
}
