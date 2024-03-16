import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Users, UsersModel } from './schema/users.schema';
import { Common } from 'src/common/common.service';
import { JwtModule } from '@nestjs/jwt';
import { Sessions, SessionsModel } from './schema/session.schema';
import { CommonModule } from 'src/common/common.module';
import { DbModule } from 'src/db/db.module';

@Module({
  imports: [
    DbModule,
    CommonModule
  ],
  controllers: [UsersController],
  providers: [UsersService, Common],
  exports: [UsersService, Common],
})
export class UsersModule { }
