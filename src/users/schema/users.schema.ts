import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export const UserSchemaName = "Users"
@Schema()
export class Users {

  @Prop({ type: String, default: null })
  ip: string

  @Prop({ type: Boolean, default: false })
  is_deleted: boolean

  @Prop({ type: Number, default: 0 })
  created_at: number

  @Prop({ type: Number, default: 0 })
  updated_at: number
}

export type UsersDocument = HydratedDocument<Users>
export const UsersModel = SchemaFactory.createForClass(Users)