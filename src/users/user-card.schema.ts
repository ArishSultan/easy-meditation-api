import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from './users.schema';

export type UserCardDocument = UserCard & Document;

@Schema()
export class UserCard {
  @Prop({ ref: User.name })
  user: string;

  @Prop({ unique: true })
  fullName: string;

  @Prop()
  cardNumber: string;

  @Prop()
  expiryDate: string;

  @Prop()
  cvc: string;

  @Prop()
  type: string;
}

export const UserCardSchema = SchemaFactory.createForClass(UserCard);
