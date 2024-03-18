import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as moment from "moment";
import { HydratedDocument } from "mongoose";
import { DeviceType, SignInType } from "src/auth/roles";

@Schema()
export class Sessions {
  @Prop({ type: String, default: null })
  access_token: string

  @Prop({ type: String, default: null })
  user_id: string

  @Prop({ type: String, default: null })
  fcm_token: string

  @Prop({ type: Number, default: 1.0 })
  version: number

  @Prop({ type: String, enum: DeviceType, default: null })
  device_type: string

  @Prop({ type: String, enum: SignInType, default: null })
  signin_via: string

  @Prop({ type: Number, default: moment().utc().valueOf() })
  created_at: string

  @Prop({ type: String, default: null })
  updated_at: string
}

export type SessionsDocument = HydratedDocument<Sessions>
export const SessionsModel = SchemaFactory.createForClass(Sessions)