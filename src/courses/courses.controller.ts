import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { MeditationModule } from './courses.schema';
import { FileInterceptor } from '@nestjs/platform-express';
import { CoursesService } from './courses.service';
import { Response } from 'express';

@Controller('courses')
export class CoursesController {
  constructor(private service: CoursesService) {}

  @Get()
  getCourses(): string[] {
    return ['beginner', 'intermediate', 'advanced'];
  }

  @Get('modules/:id')
  streamCourse(@Param('id') id: string, @Res() res: Response): void {
    this.service.streamModule(id, res);
  }

  @Post('modules')
  @UseInterceptors(FileInterceptor('file'))
  postModule(
    @Body() module: MeditationModule,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<MeditationModule> {
    return this.service.createModule(module, file.buffer);
  }

  @Delete('modules/:id')
  deleteModule(@Param('id') id: string): Promise<boolean> {
    return this.service.deleteModule(id);
  }

  @Get(':id')
  getModules(@Param('id') courseId: number) {
    return this.service.getCourses(courseId);
  }
}
