import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type DeedDocument = Deed & Document;

@Schema()
export class Deed {
  _id: string;
  @Prop()
  uid: string;
  @Prop()
  text: string;
}

export const DeedSchema = SchemaFactory.createForClass(Deed);
