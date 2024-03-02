import { Module } from "@nestjs/common";
import { Common } from "./common.service";
import { JwtModule } from "@nestjs/jwt";
import { MailerModule } from "@nestjs-modules/mailer";
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MongooseModule } from "@nestjs/mongoose";
import { Sessions, SessionsModel } from "src/users/schema/session.schema";
import { Users, UsersModel } from "src/users/schema/users.schema";


@Module({
  imports: [
    MongooseModule.forFeature([{ name: Users.name, schema: UsersModel }, { name: Sessions.name, schema: SessionsModel }],),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_CONSTANTS_SECRET,
      // signOptions: { expiresIn: 60 * 60 * 24 + 's' },
    }),
    MailerModule.forRoot({
      transport: {
        host: "smtp.zeptomail.eu",
        port: 587,
        auth: {
          user: process.env.ZEPTO_USER,
          pass: process.env.ZEPTO_TOKEN
        }
      },
      template: {
        dir: process.cwd() + '/dist/templates/',
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
  ],
  providers: [Common],
  exports: [Common]
})

export class CommonModule { }