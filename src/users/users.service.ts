import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto, SignUpDto } from './dto/user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Users } from './schema/users.schema';
import { Model, model } from 'mongoose';
import { Common } from 'src/common/common.service';
import * as moment from 'moment';
import { DbService } from 'src/db/db.service';

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
        throw new HttpException({ error_description: 'This Email is Already Exist! Please Use another Email Address', error_code: 'EMAIL_ALREADY_EXIST' }, HttpStatus.BAD_REQUEST);
      }
      if (existPhone) {
        throw new HttpException({ error_description: 'This Phone no. is Already Exist! Please Use another Phone no.', error_code: 'PHONE_ALREADY_EXIST' }, HttpStatus.BAD_REQUEST);
      }
      const otp = await this.common.generateOtp()
      const password = await this.common.encriptPass(body.password)
      let user = await this.model.users.create({
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
      await this.common.sendVerification(body.email, user.first_name, user.last_name, otp)
      const payload = { id: user?._id, email: body?.email }
      const accessToken = await this.common.createSession(payload)
      return { accessToken }
    } catch (error) {
      console.log('===> From SignUp', error);
      throw error
    }
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
