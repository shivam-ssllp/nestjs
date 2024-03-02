import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export const UserSchemaName = "Users"
@Schema()
export class Users {

  @Prop({ type: String, default: null })
  ip: string

  @Prop({ type: String, default: null })
  first_name: string

  @Prop({ type: String, default: null })
  last_name: string

  @Prop({ type: String, default: null })
  email: string

  @Prop({ type: String, default: null })
  password: string

  @Prop({ type: String, default: null })
  temp_email: string

  @Prop({ type: String, default: null })
  country_code: string

  @Prop({ type: String, default: null })
  phone: string

  @Prop({ type: String, default: null })
  temp_country_code: string

  @Prop({ type: String, default: null })
  temp_phone: string

  @Prop({ type: Number, default: null })
  email_otp: number

  @Prop({ type: Number, default: null })
  phone_otp: number

  @Prop({ type: Boolean, default: false })
  is_email_verifed: boolean

  @Prop({ type: Boolean, default: false })
  is_phone_verifed: boolean

  @Prop({ type: Boolean, default: false })
  is_deleted: boolean

  @Prop({ type: Number, default: 0 })
  created_at: number

  @Prop({ type: Number, default: 0 })
  updated_at: number
}

export type UsersDocument = HydratedDocument<Users>
export const UsersModel = SchemaFactory.createForClass(Users)