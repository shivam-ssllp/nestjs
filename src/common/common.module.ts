import { Global, Module } from "@nestjs/common";
import { Common } from "./common.service";
import { JwtModule } from "@nestjs/jwt";
import { MailerModule } from "@nestjs-modules/mailer";
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MongooseModule } from "@nestjs/mongoose";
import { Sessions, SessionsModel } from "src/users/schema/session.schema";
import { Users, UsersModel } from "src/users/schema/users.schema";
import { config } from "dotenv";
import { ConfigModule } from "@nestjs/config";
import { DbModule } from "src/db/db.module";

config()
@Module({
  imports: [
    DbModule
  ],
  providers: [Common],
  exports: [Common]
})

export class CommonModule { }