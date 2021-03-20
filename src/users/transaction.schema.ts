import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { UserCard } from './user-card.schema';
import { User } from './users.schema';

export type TransactionDocument = Transaction & Document;

@Schema()
export class Transaction {
  @Prop({ ref: User.name })
  user: string;

  @Prop({ ref: UserCard.name })
  card: string;

  @Prop()
  amount: number;

  @Prop()
  createdAt: Date;

  @Prop()
  requiredAt: Date;

  @Prop()
  nextAt: Date;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
