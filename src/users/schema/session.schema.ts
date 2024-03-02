import { SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export class Sessions {

}

export type SessionsDocument = HydratedDocument<Sessions>
export const SessionsModel = SchemaFactory.createForClass(Sessions)