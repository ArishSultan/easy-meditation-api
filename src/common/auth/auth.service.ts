import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { User, UserSchema } from "../../users/users.schema";
import { UsersService } from '../../users/users.service';
// import { IUser } from '../../data/interfaces/user.interface';
// import { UsersService } from '../../modules/administrator/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  async validateUser(username: string, pass: string): Promise<User | null> {
    const user = await this.usersService.findByUsername(username);

    if (user && user.password === pass) {
      user.password = undefined;

      return user;
    }

    return null;
  }

  async signIn(user: User): Promise<{ access_token }> {
    return {
      access_token: await this.jwtService.signAsync({ user: user }),
    };
  }

  async profile(user: { userId }): Promise<{ user }> {
    return { user: await this.usersService.findById(user.userId) };
  }
}
