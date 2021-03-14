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

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  getUsers() {
    return this.usersService.findAll();
  }

  @Get(':id')
  getUser(@Param('id') id: string) {
    return this.usersService.findById(id);
  }

  @Post()
  postUser(@Body() user: User): Promise<User> {
    return this.usersService.createUser(user);
  }

  @Patch()
  async patchUser(@Body() user: User): Promise<{ result: boolean }> {
    return {
      result: await this.usersService.updateUser(user),
    };
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    return { result: this.usersService.deleteUser(id) };
  }
}
