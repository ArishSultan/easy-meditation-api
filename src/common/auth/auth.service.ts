import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { User } from '../../users/users.schema';
import { UsersService } from '../../users/users.service';
import { CoursesService } from '../../courses/courses.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
    private coursesService: CoursesService,
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
      access_token: await this.jwtService.signAsync({
        username: user.username,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        sub: user._id,
      }),
    };
  }

  async profile(user: { userId }): Promise<any> {
    return {
      user: await this.usersService.findById(user.userId),
      favorites: await this.coursesService.getUserFavorites(user.userId),
    };
  }
}
