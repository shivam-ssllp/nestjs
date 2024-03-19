import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Types } from "mongoose";
import { Common } from "src/common/common.service";
import { DbService } from "src/db/db.service";
import { ErrorMsg, SuccessMsg } from "src/error/error.handler";
import { OtpDto, SignInDto } from "src/users/dto/user.dto";

@Injectable()
export class AuthService {
  constructor(
    private readonly model: DbService,
    private readonly common: Common
  ) { }

  async signIn(body: SignInDto) {
    try {
      const query = {
        $or: [
          { email: body.email },
          { temp_email: body.email }
        ]
      }
      let user: any = await this.model.users.findOne(query)
      const isMatch = await this.common.bcriptPass(body?.password, user?.password)
      if (!isMatch) throw new HttpException({ message: ErrorMsg["en"].WRONG_PASS }, HttpStatus.BAD_REQUEST)
      const payload = { id: user?._id, email: body?.email }
      const accessToken = await this.common.createSession(payload)
      user = await this.model.users.findOne(query, { password: 0, is_deleted: 0, __v: 0, updated_at: 0 }, { lean: true })
      return { accessToken, ...user }
    } catch (error) {
      console.log("signIn ==>", error);
      throw error
    }

  }

  async verifyOtp(body: OtpDto, field: string, user_id: string) {
    try {
      let data
      let user = await this.model.users.findById({ _id: new Types.ObjectId(user_id) })
      if (user?.[field + '_otp'] !== body.otp) {
        throw new HttpException({ message: ErrorMsg["en"].INVALID_OTP }, HttpStatus.BAD_REQUEST)
      }
      if (field == 'email') {
        data = {
          is_email_verified: true,
          email: user?.temp_email,
          temp_email: null,
          email_otp: null,
          phone_otp: 1234
        }
      } else if (field == 'phone') {
        data = {
          is_phone_verified: true,
          phone: user?.temp_phone,
          country_code: user?.temp_country_code,
          temp_phone: null,
          temp_country_code: null,
          phone_otp: null
        }
      } else return
      await this.model.users.findOneAndUpdate(
        { _id: new Types.ObjectId(user_id) },
        data,
        { new: true }
      )
      const fieldCondition = field === 'email' ? 'email' : 'phone';
      const tempField = `temp_${fieldCondition}`
      const key = `is_${field}_verified`
      let query = {
        [tempField]: user[tempField],
        [key]: false,
        ...(field === 'phone' && { temp_country_code: user.temp_country_code }),
      };
      let temp_destroy = await this.model.users.deleteMany(query)
      if (temp_destroy) { throw new HttpException({ message: SuccessMsg["en"].OTP_VERIFIED }, HttpStatus.OK) }

    } catch (error) {
      console.log(error);
      throw error
    }
  }


}