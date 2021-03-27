import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { User } from './users.schema';
import { UsersService } from './users.service';
import { UserCard } from './user-card.schema';
import { Transaction } from './transaction.schema';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  getUsers() {
    return this.usersService.findAll();
  }

  @Get('customers')
  getCustomers() {
    return this.usersService.findAllCustomers();
  }

  @Get(':id')
  getUser(@Param('id') id: string) {
    return this.usersService.findById(id);
  }

  @Get(':id/last-transaction')
  getLastTransaction(@Param('id') id: string) {
    return this.usersService.getLastTransactionOf(id);
  }

  @Post(':id/card')
  postUserCard(@Param('id') id: string, @Body() card: UserCard) {
    return this.usersService.saveCard(id, card);
  }

  @Post()
  postUser(@Body() user: User) {
    return this.usersService.createUser(user);
  }

  @Post('transactions')
  postTransaction(@Body() transaction: Transaction) {
    return this.usersService.createTransaction(transaction);
  }

  @Patch()
  async patchUser(@Body() user: User): Promise<{ result: boolean }> {
    return {
      result: await this.usersService.updateUser(user),
    };
  }

  @Post('is-valid-token/:token')
  async validateToken(@Param('token') token: string) {
    return { result: await this.usersService.isValidToken(token) };
  }

  @Post('change-forgotten-password')
  async changeForgottenPassword(@Body() data: any) {
    return this.usersService.changeForgottenPassword(data);
  }

  @Post('add-recommended')
  addRecommended(@Body() data: { userId: string; module: string }) {
    return this.usersService.addRecommended(data.userId, data.module);
  }

  @Post('remove-recommended')
  removeRecommended(@Body() data: { userId: string; module: string }) {
    return this.usersService.removeRecommended(data.userId, data.module);
  }

  @Post('forgot-password')
  forgotPassword(@Body() email: { email }) {
    return this.usersService.manageForgotPasswordRequest(email.email);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    return { result: this.usersService.deleteUser(id) };
  }
}
