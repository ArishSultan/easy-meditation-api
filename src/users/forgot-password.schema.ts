import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type ForgotPasswordDocument = ForgotPassword & Document;

@Schema({ id: false })
export class ForgotPassword {
  @Prop()
  secureHash: string;

  @Prop()
  email: string;

  @Prop()
  createdAt: Date;
}

export const ForgotPasswordSchema = SchemaFactory.createForClass(
  ForgotPassword,
);
