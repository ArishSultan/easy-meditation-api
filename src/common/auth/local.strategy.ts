import { Injectable, UnauthorizedException } from '@nestjs/common';

import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';
import { PassportStrategy } from '@nestjs/passport';
import { User } from '../../users/users.schema';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private service: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<User> {
    const user = await this.service.validateUser(username, password);
    console.log(user);
    if (!user) throw new UnauthorizedException();

    return user;
  }
}
