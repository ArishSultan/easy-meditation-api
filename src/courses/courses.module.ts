import { Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { MeditationModule, MeditationModuleSchema } from './courses.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: MeditationModule.name,
        schema: MeditationModuleSchema,
      },
    ]),
  ],
  providers: [CoursesService],
  controllers: [CoursesController],
})
export class CoursesModule {}
