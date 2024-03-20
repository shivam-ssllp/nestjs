import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsOptional, IsStrongPassword } from "class-validator";
import { DeviceType, SignInType } from "src/auth/roles";

export class CreateUserDto { }

export class SignUpDto {
  @ApiProperty({ required: true })
  first_name: string

  @ApiProperty({ required: true })
  last_name: string

  @IsEmail()
  @ApiProperty({ required: true })
  email: string

  @IsStrongPassword()
  @ApiProperty({ required: true })
  password: string

  @ApiProperty({ required: true })
  country_code: string

  @ApiProperty({ required: true })
  phone: string

}

export class OtpDto {
  @ApiProperty()
  otp: number
}

export class SignInDto {
  @IsOptional()
  @IsEmail()
  @ApiProperty()
  email: string

  @IsOptional()
  @ApiProperty()
  password: string


  @ApiProperty({ required: false })
  fcm_token: string

  @IsOptional()
  @ApiProperty({ enum: DeviceType, default: DeviceType.Web })
  device_type: string
}

export class SocialSignInDto {

}

export class GetUsersDto {
  @ApiProperty({ default: 1, required: true })
  pagination: number
  @ApiProperty({ default: 10, required: true })
  limit: number
}