import { Global, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Advertisements, AdvertisementsModel } from "src/practices/schema/advertisements.schema";
import { Sessions, SessionsModel } from "src/users/schema/session.schema";
import { Users, UsersModel } from "src/users/schema/users.schema";
import { DbService } from "./db.service";
import { config } from "dotenv";

config()
@Global()
@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_DB_URI, {
      dbName: process.env.MONGO_DB_DATABASE_NAME
    }),
    MongooseModule.forFeature([
      { name: Users.name, schema: UsersModel },
      { name: Sessions.name, schema: SessionsModel },
      { name: Advertisements.name, schema: AdvertisementsModel }
    ]),
  ],
  providers: [DbService],
  exports: [DbService],
})

export class DbModule { }