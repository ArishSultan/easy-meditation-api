import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { MeditationModule } from './courses.schema';
import { FileInterceptor } from '@nestjs/platform-express';
import { CoursesService } from './courses.service';
import { Response } from 'express';
import { ModuleFavorite } from './module-favorite.schema';
import { ModuleListened } from './module-listened.schema';

@Controller('courses')
export class CoursesController {
  constructor(private service: CoursesService) {}

  @Get()
  getCourses(): string[] {
    return ['beginner', 'intermediate', 'advanced'];
  }

  @Get('modules/:id')
  streamCourse(@Param('id') id: string, @Res() res: Response): Promise<void> {
    return this.service.streamModule(id, res);
  }

  @Post('modules')
  @UseInterceptors(FileInterceptor('file'))
  postModule(
    @Body() module: MeditationModule,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<MeditationModule> {
    return this.service.createModule(module, file.buffer);
  }

  @Patch('modules')
  @UseInterceptors(FileInterceptor('file'))
  patchModule(
    @Body() module: MeditationModule,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<MeditationModule> {
    return this.service.updateModule(module, file?.buffer);
  }

  @Post('modules/:id/mark-fav')
  markModuleFavorite(
    @Param('id') id: string,
    @Body() userId: { userId },
  ): Promise<ModuleFavorite> {
    return this.service.markFavorite(id, userId.userId);
  }

  @Delete('modules/:id/unmark-fav')
  unMarkModuleFavorite(@Param('id') id: string, @Body() userId: { userId }) {
    return this.service.unMarkFavorite(id, userId.userId);
  }

  @Post('modules/:id/mark-listened')
  markModuleListened(
    @Param('id') id: string,
    @Body() userId: { userId },
  ): Promise<ModuleListened> {
    return this.service.markListened(id, userId.userId);
  }

  @Delete('modules/:id')
  deleteModule(@Param('id') id: string): Promise<boolean> {
    return this.service.deleteModule(id);
  }

  @Get('modules/:id/favorites')
  getFavorites(@Param('id') id: string): Promise<ModuleFavorite[]> {
    return this.service.getModuleFavorites(id);
  }

  @Get(':id')
  getModules(@Param('id') courseId: number) {
    return this.service.getCourses(courseId);
  }
}
