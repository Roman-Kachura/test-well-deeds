import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  _id: string;
  @Prop()
  email: string;
  @Prop()
  password: string;
  @Prop()
  name: string;
  @Prop()
  token: string;
  @Prop()
  nick: string;
  @Prop()
  friends: string[];
}

export const UsersSchema = SchemaFactory.createForClass(User);
