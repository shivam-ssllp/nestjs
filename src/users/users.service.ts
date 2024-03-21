import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { GetUsersDto, SignUpDto } from './dto/user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Common } from 'src/common/common.service';
import * as moment from 'moment';
import { DbService } from 'src/db/db.service';
import { ErrorMsg } from 'src/error/error.handler';
import { Types } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(
    private readonly common: Common,
    private readonly model: DbService
  ) { }

  async signUp(body: SignUpDto) {
    try {
      const existMail = await this.model.users.findOne({ email: body.email, })
      const existPhone = await this.model.users.findOne({ country_code: body.country_code, phone: body.phone })
      if (existMail) {
        throw new HttpException({ message: ErrorMsg["en"].EMAIL_ALREADY_EXIST }, HttpStatus.BAD_REQUEST);
      }
      if (existPhone) {
        throw new HttpException({ message: ErrorMsg["en"].PHONE_ALREADY_EXIST }, HttpStatus.BAD_REQUEST);
      }
      const otp = await this.common.generateOtp()
      const password = await this.common.encriptPass(body.password)
      const user = await this.createUser(body, password, otp)
      try {
        await this.common.sendVerification(body.email, user.first_name, user.last_name, otp)
      } catch (error) {
        console.log(error);
      }
      const payload = { id: user?._id, email: body?.email }
      const accessToken = await this.common.createSession(payload)
      return { accessToken }
    } catch (error) {
      console.log('===> From SignUp', error);
      throw error
    }
  }

  async createUser(body: any, password: string, otp) {
    try {
      return await this.model.users.create({
        first_name: body.first_name,
        last_name: body.last_name,
        temp_email: body.email,
        temp_country_code: body.country_code,
        temp_phone: body.phone,
        email_otp: otp,
        phone_otp: 1234,
        password,
        created_at: moment().utc().valueOf(),
        date_of_change_pasword: moment().utc().valueOf()
      })
    } catch (error) {
      console.log('===> From createUser', error);
      throw error
    }
  }

  async getAllUsers(payload: GetUsersDto) {
    try {
      const options = await this.common.set_options(payload.pagination, payload.limit)
      const users = await this.model.users.find({ is_deleted: false }, { __v: 0 }, options)
      return { users }
    } catch (error) {
      console.log(error);
      throw error
    }
  }

  async getById(id: string) {
    try {
      const data = await this.model.users.findById({ _id: new Types.ObjectId(id) }, { __v: 0, is_deleted: 0, updated_at: 0 }, { lean: true })
      return { data }
    } catch (error) {
      console.log(error);
      throw error
    }
  }
}
