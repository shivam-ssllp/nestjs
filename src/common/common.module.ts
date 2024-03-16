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
console.log({secret: process.env.JWT_CONSTANTS_SECRET});

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_CONSTANTS_SECRET,
      // signOptions: { expiresIn: 60 * 60 * 24 + 's' },
    }),
    MailerModule.forRoot({
      transport: {
        host: "smtp.gmail.com",
        secure: false,
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASSWORD
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
    DbModule
  ],
  providers: [Common],
  exports: [Common]
})

export class CommonModule { }