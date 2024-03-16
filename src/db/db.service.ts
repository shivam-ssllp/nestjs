import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Advertisements } from "src/practices/schema/advertisements.schema";
import { Sessions } from "src/users/schema/session.schema";
import { Users } from "src/users/schema/users.schema";

@Injectable()
export class DbService {
    constructor(
        @InjectModel(Advertisements.name) public readonly advertisements: Model<Advertisements>,
        @InjectModel(Users.name) public readonly users: Model<Users>,
        @InjectModel(Sessions.name) public readonly session: Model<Sessions>,


    ) { }
}