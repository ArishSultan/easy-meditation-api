import { Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { MeditationModule, MeditationModuleSchema } from './courses.schema';
import { ModuleFavoriteSchema, ModuleFavorite } from './module-favorite.schema';
import { ModuleListened, ModuleListenedSchema } from './module-listened.schema';
import {
  ForgotPassword,
  ForgotPasswordSchema,
} from '../users/forgot-password.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: MeditationModule.name,
        schema: MeditationModuleSchema,
      },
      {
        name: ModuleFavorite.name,
        schema: ModuleFavoriteSchema,
      },
      {
        name: ModuleListened.name,
        schema: ModuleListenedSchema,
      },
    ]),
  ],
  exports: [CoursesService],
  providers: [CoursesService],
  controllers: [CoursesController],
})
export class CoursesModule {}
