import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from '../users/users.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type ModuleListenedDocument = ModuleListened & Document;

@Schema({ id: false })
export class ModuleListened {
  @Prop()
  courseId: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'users' })
  userId: User;
}

export const ModuleListenedSchema = SchemaFactory.createForClass(
  ModuleListened,
);
