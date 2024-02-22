import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export const AdvertisementsSchemaName = "Advertisements"
@Schema()
export class Advertisements {

  @Prop({ type: String, default: null })
  wallet_address: string

  @Prop({ type: String, default: false })
  ip: string

  @Prop({ type: String, default: false })
  image: string

  @Prop({ type: [Object], default: [] })
  pixels: Array<{ x: number, y: number }>;

}

export type AdvertisementsDocument = HydratedDocument<Advertisements>
export const AdvertisementsModel = SchemaFactory.createForClass(Advertisements)