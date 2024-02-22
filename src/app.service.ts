import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';

@Injectable()
export class AppService {
  async signInWithMetamask(signature: string, message: string): Promise<string> {
    const verify = ethers.verifyMessage(message, signature)
    return verify
  }
}
