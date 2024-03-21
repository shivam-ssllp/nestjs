import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, GetUsersDto } from './dto/user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @ApiBearerAuth('authentication')
  @UseGuards(AuthGuard)
  @Get()
  getAllUsers(@Query() payload: GetUsersDto) {
    return this.usersService.getAllUsers(payload)
  }

  @ApiBearerAuth('authentication')
  @UseGuards(AuthGuard)
  @Get(':id')
  getById(@Param("id") id: string) {
    return this.usersService.getById(id)
  }

}
