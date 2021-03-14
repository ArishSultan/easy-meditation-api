import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forRoot('mongodb://192.168.1.14:27017/nest')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
