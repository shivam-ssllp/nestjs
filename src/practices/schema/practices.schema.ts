import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export const PracticesSchemaName = "Practices"
@Schema()
export class Practices {

  @Prop({ type: String, default: null })
  oprator: string

  @Prop({ type: String, default: false })
  level: string

  @Prop({ type: String, default: false })
  question: string

  @Prop({ type: [String], default: [] })
  ips: string[];

  @Prop({ type: Number, default: 0 })
  created_at: number

  @Prop({ type: Number, default: 0 })
  updated_at: number
}

export type PracticesDocument = HydratedDocument<Practices>
export const PracticessModel = SchemaFactory.createForClass(Practices)