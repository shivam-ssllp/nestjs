import { Controller, Get, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, GetUsersDto } from './dto/user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get()
  getAllUsers(@Query() payload:GetUsersDto) { 
    return this.usersService.getAllUsers(payload)
  }

}
