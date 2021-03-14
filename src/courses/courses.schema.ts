import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MeditationModuleDocument = MeditationModule & Document;

@Schema()
export class MeditationModule {
  @Prop()
  courseNumber: number;

  @Prop()
  name: string;

  @Prop()
  length: number;

  @Prop()
  size: number;

  @Prop({ default: 0 })
  favorites: number;

  @Prop({ default: 0 })
  listened: number;

  @Prop()
  filename: string;

  @Prop()
  trackId: string;
}

export const MeditationModuleSchema = SchemaFactory.createForClass(
  MeditationModule,
);
