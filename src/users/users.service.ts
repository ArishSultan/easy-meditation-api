import { InjectConnection } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { User } from './users.schema';
import { Connection } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectConnection() private connection: Connection) {}

  findById(userId: string): Promise<User> {
    return this.connection.collection(User.name).findOne({ _id: userId });
  }

  findByUsername(username: string): Promise<User> {
    return this.connection
      .collection(User.name)
      .findOne({ username: username });
  }
}
