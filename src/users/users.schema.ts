import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ unique: true })
  username: string;

  @Prop()
  password: string;

  @Prop()
  email: string;

  @Prop()
  name: string;

  @Prop()
  scope: number[];

  @Prop()
  isTrial: boolean;

  @Prop()
  hasPremiumAccess: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
