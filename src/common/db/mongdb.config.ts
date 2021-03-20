import { Injectable } from '@nestjs/common';
import {
  MongooseModuleOptions,
  MongooseOptionsFactory,
} from '@nestjs/mongoose';

@Injectable()
export class MongooseConfigService implements MongooseOptionsFactory {
  private username = '';
  private password = '';

  createMongooseOptions():
    | Promise<MongooseModuleOptions>
    | MongooseModuleOptions {
    return {
      useCreateIndex: true,
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
      uri:
        'mongodb+srv://arish:123@cluster0.kz2th.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
      // 'mongodb://192.168.10.14:27017/meditation-app__db',
      // 'mongodb://192.168.10.10:27017/meditation-app__db',
    };
  }
}
