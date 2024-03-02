import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto { }

export class BraucherMailDto {
    @ApiProperty()
    name: string
    
    @ApiProperty()
    email: string
}