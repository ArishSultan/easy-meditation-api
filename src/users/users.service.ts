import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { User, UserDocument } from './users.schema';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async createUser(user: User): Promise<User> {
    console.log(user);
    return new this.userModel(user).save();
  }

  async deleteUser(id: string): Promise<boolean> {
    return (
      (await this.userModel.deleteOne({ _id: id }).exec()).deletedCount == 1
    );
  }

  findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  findById(userId: string): Promise<User> {
    return this.userModel.findOne({ _id: userId }).exec();
  }

  findByUsername(username: string): Promise<User> {
    return this.userModel.findOne({ username: username }).exec();
  }

  async updateUser(user: User): Promise<boolean> {
    const result = await this.userModel
      .updateOne({ username: user.username }, user)
      .exec();

    return result.nModified == 1;
  }
}
