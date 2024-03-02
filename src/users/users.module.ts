import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Users, UsersModel } from './schema/users.schema';
import { Common } from 'src/common/common.service';
import { JwtModule } from '@nestjs/jwt';
import { Sessions, SessionsModel } from './schema/session.schema';
import { CommonModule } from 'src/common/common.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Users.name, schema: UsersModel }, { name: Sessions.name, schema: SessionsModel }],),
    CommonModule
  ],
  controllers: [UsersController],
  providers: [UsersService, Common],
  exports: [UsersService, Common],
})
export class UsersModule { }
