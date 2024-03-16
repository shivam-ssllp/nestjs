import { Injectable } from "@nestjs/common";
import { OtpDto } from "src/users/dto/user.dto";

@Injectable()
export class AuthService {
  constructor(){}

  async verifyEmail(body: OtpDto, user_id: string) {
    try {
      let user = await this
    } catch (error) {
      console.log('from verify Email ==> ', error);
      throw error
    }
  }

}