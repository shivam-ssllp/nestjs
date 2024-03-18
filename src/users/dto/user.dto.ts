import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsStrongPassword } from "class-validator";

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
  @IsEmail()
  @ApiProperty()
  email: string

  @ApiProperty()
  password: string
}