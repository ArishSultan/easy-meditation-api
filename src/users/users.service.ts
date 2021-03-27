import * as dayjs from 'dayjs';
import { createHash } from 'crypto';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { User, UserDocument } from './users.schema';
import { Model } from 'mongoose';
import { createTransport } from 'nodemailer';
import { UserCard, UserCardDocument } from './user-card.schema';
import { Transaction, TransactionDocument } from './transaction.schema';
import {
  ForgotPassword,
  ForgotPasswordDocument,
} from './forgot-password.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(UserCard.name) private userCardModel: Model<UserCardDocument>,
    @InjectModel(Transaction.name)
    private transaction: Model<TransactionDocument>,
    @InjectModel(ForgotPassword.name)
    private forgotPasswordModel: Model<ForgotPasswordDocument>,
  ) {}

  async createUser(user: User): Promise<User> {
    const _user = await this.userModel.create(user);

    const date = dayjs();
    await new this.transaction({
      user: _user.username,
      card: null,
      amount: 0,
      createdAt: date.format(),
      requiredAt: date.format(),
      nextAt: date.add(3, 'months').format(),
    }).save();

    return user;
  }

  async createTransaction(transaction: Transaction) {
    return new this.transaction(transaction).save();
  }

  async deleteUser(id: string): Promise<boolean> {
    return (
      (await this.userModel.deleteOne({ _id: id }).exec()).deletedCount == 1
    );
  }

  findAll(): Promise<User[]> {
    return this.userModel
      .find({ scope: { $in: [0, 1] }, name: { $ne: null } })
      .exec();
  }

  async findById(userId: string): Promise<any> {
    const card = this.userCardModel.findOne({ user: userId }).exec();
    return {
      ...// eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      (await this.userModel.findOne({ _id: userId }).populate('modules').exec())._doc,
      card,
    };
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

  findAllCustomers() {
    return this.userModel.find({ scope: 2 }).exec();
  }

  async saveCard(id: string, card: UserCard) {
    card.user = id;
    const _card = await this.userCardModel.findOne({ user: id }).exec();
    if (_card) {
      _card.update(card);
    } else {
      return new this.userCardModel(card).save();
    }
  }

  getLastTransactionOf(id: string) {
    return this.transaction.find({ user: id }).sort({ createdAt: -1 }).limit(1);
  }

  async isValidToken(token: string) {
    const data = await this.forgotPasswordModel.findOne({ secureHash: token });
    return !!data;
  }

  async manageForgotPasswordRequest(email) {
    const current_date = new Date().valueOf().toString();
    const random = Math.random().toString();
    const hash = createHash('sha1')
      .update(current_date + random)
      .digest('hex');

    const data = await new this.forgotPasswordModel({
      email,
      secureHash: hash,
      createdAt: Date.now(),
    }).save();

    const transport = createTransport({
      service: 'gmail',
      auth: {
        user: 'arishsultan104@gmail.com',
        pass: 'wnufejuwjmtfawvh',
      },
    });

    const url = 'https://mysterious-garden-78033.herokuapp.com/';
    transport.sendMail({
      from: 'arishsultan104@gmail.com',
      to: email,
      subject: 'Forgotten Password',
      text: `<html lang="en"><a href="${url}/reset-password/${hash}">Click here</a></html>`,
    });
  }

  async changeForgottenPassword(data: any) {
    const token = await this.forgotPasswordModel
      .findOne({ secureHash: data.token })
      .exec();
    const user = await this.userModel.findOne({ username: token.email }).exec();
    if (user) {
      user.password = data.password;
    }
    await token.delete();

    return user.save();
  }

  async addRecommended(id: string, module: string) {
    const user = await this.userModel.findById(id).exec();
    user.modules.push(module);
    await user.save();

    return user;
  }

  async removeRecommended(id: string, module: string) {
    const user = await this.userModel.findById(id).exec();
    user.modules.splice(user.modules.indexOf(module), 1);
    await user.save();

    return user;
  }
}
