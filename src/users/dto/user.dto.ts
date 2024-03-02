import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto { }

export class SignUpDto {
    @ApiProperty()
    first_name: string
    
    @ApiProperty()
    last_name: string
    
    @ApiProperty()
    email: string

    @ApiProperty()
    password: string

    @ApiProperty()
    country_code: string

    @ApiProperty()
    phone: string

}