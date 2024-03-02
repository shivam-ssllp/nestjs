import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ethers } from 'ethers';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AppService {

  constructor(
    private jwtService: JwtService
  ) { }

  async signInWithMetamask(signature: string, message: string, wallet_address: string): Promise<string> {
    const wallet = ethers.verifyMessage(message, signature)
    if (wallet.toLowerCase() == wallet_address.toLowerCase()) {
      return await this.jwtService.signAsync(wallet)
    }
    throw new UnauthorizedException({
      signature,
      message,
      wallet,
      wallet_address,
    })
  }
}
