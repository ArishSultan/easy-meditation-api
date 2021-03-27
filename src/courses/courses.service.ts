import { Injectable } from '@nestjs/common';
import { GridFSBucket, ObjectId } from 'mongodb';
import { MeditationModule, MeditationModuleDocument } from './courses.schema';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { Readable } from 'stream';
import { Response } from 'express';
import * as mp3Duration from 'mp3-duration';
import {
  ModuleFavorite,
  ModuleFavoriteDocument,
} from './module-favorite.schema';
import { ModuleListened } from './module-listened.schema';

@Injectable()
export class CoursesService {
  constructor(
    @InjectModel(MeditationModule.name)
    private model: Model<MeditationModuleDocument>,
    @InjectModel(ModuleFavorite.name)
    private listenedModel: Model<ModuleFavoriteDocument>,
    @InjectModel(ModuleListened.name)
    private favoritesModel: Model<ModuleFavoriteDocument>,
    @InjectConnection()
    private connection: Connection,
  ) {}

  getCourses(courseNumber: number) {
    return this.model.find({ courseNumber }).exec();
  }

  async streamModule(moduleId: string, res: Response): Promise<void> {
    const module = await this.model.findOne({ _id: moduleId });
    if (module == null) {
      res.status(404).end();
      return;
    }

    const bucket = new GridFSBucket(this.connection.db, {
      bucketName: 'tracks',
    });

    const stream = bucket.openDownloadStream(
      ObjectId.createFromHexString(module.trackId),
    );

    if (module.size) {
      const size = module.size.toString();
      res.header('content-length', size);
      res.header('Accept-Ranges', 'bytes');
      res.header('content-range', `bytes 0-${size}/${size}`);
    }

    stream.on('data', (chunk) => res.write(chunk));
    stream.on('end', () => res.end());
    stream.on('error', (err) => res.status(500).end(err.message));
  }

  createModule(
    module: MeditationModule,
    file: Buffer,
  ): Promise<MeditationModule> {
    const bucket = new GridFSBucket(this.connection.db, {
      bucketName: 'tracks',
    });

    const uploaderStream = new Readable();
    uploaderStream.push(file);
    uploaderStream.push(null);

    const stream = bucket.openUploadStream(Date.now().toString());
    uploaderStream.pipe(stream);

    return new Promise((resolve, reject) => {
      stream.on('error', reject);
      stream.on('finish', () => {
        mp3Duration(file, (err, duration) => {
          if (err) reject(err);
          else {
            module.size = file.length;
            module.length = duration;
            module.trackId = stream.id.toString();
            resolve(new this.model(module).save());
          }
        });
      });
    });
  }

  async deleteModule(id: string): Promise<boolean> {
    const bucket = new GridFSBucket(this.connection.db, {
      bucketName: 'tracks',
    });

    const module = await this.model.findById(id);
    bucket.delete(ObjectId.createFromHexString(module.trackId));

    return (await this.model.deleteOne({ _id: id }).exec()).deletedCount == 1;
  }

  async markListened(id: string, userId: string): Promise<ModuleListened> {
    const module = await this.model.findById(id);
    if (module) {
      module.listened++;
      module.save();

      return new this.listenedModel({ courseId: id, user: userId });
    }
  }

  async markFavorite(id: string, userId: string): Promise<ModuleFavorite> {
    const module = await this.model.findById(id);
    if (module) {
      module.favorites++;
      module.save();

      return new this.favoritesModel({ courseId: id, user: userId });
    }
  }

  async unMarkFavorite(id: string, userId: string) {
    const result = await this.favoritesModel
      .deleteOne({ courseId: id, user: userId })
      .exec();

    if (result.ok > 0) {
      return this.model
        .updateOne({ _id: id }, { $inc: { favorites: -1 } })
        .then((data) => {
          console.log(data);
        });
    }
  }

  async getUserFavorites(userId: string) {
    return this.favoritesModel.find({ user: userId }).exec();
  }

  getModuleFavorites(id: string) {
    return this.favoritesModel.find({ courseId: id }).populate('user').exec();
  }

  updateModule(module: MeditationModule) {
    console.log(module);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return this.model.findByIdAndUpdate(module._id, module).exec();
  }
}
