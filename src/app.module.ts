import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './common/auth/auth.module';
import { UsersModule } from './users/users.module';
import { MongooseConfigService } from './common/db/mongdb.config';
import { CoursesModule } from './courses/courses.module';
import { AboutController } from './about/about.controller';
import { AboutService } from './about/about.service';
import { AboutModule } from './about/about.module';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useClass: MongooseConfigService,
    }),
    AuthModule,
    UsersModule,
    CoursesModule,
    AboutModule,
  ],
  controllers: [AppController, AboutController],
  providers: [AppService, AboutService],
})
export class AppModule {}
