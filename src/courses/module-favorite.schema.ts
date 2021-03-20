import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from '../users/users.schema';
import { Document } from 'mongoose';

export type ModuleFavoriteDocument = ModuleFavorite & Document;

@Schema({ id: false })
export class ModuleFavorite {
  @Prop()
  courseId: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'users' })
  userId: User;
}

export const ModuleFavoriteSchema = SchemaFactory.createForClass(
  ModuleFavorite,
);
