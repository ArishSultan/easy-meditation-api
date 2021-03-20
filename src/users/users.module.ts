import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './users.schema';
import { UserCard, UserCardSchema } from './user-card.schema';
import { Transaction, TransactionSchema } from './transaction.schema';
import {
  ForgotPassword,
  ForgotPasswordSchema,
} from './forgot-password.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
    MongooseModule.forFeature([
      {
        name: UserCard.name,
        schema: UserCardSchema,
      },
    ]),
    MongooseModule.forFeature([
      {
        name: Transaction.name,
        schema: TransactionSchema,
      },
    ]),
    MongooseModule.forFeature([
      {
        name: ForgotPassword.name,
        schema: ForgotPasswordSchema,
      },
    ]),
  ],
  exports: [UsersService],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
