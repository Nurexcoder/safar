import { ConflictException, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { CreateUserDto } from './dto/CreateUser.dto';
import { User } from 'src/user/user.schema';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async signUp(createUser: CreateUserDto): Promise<User> {
    const user = await this.userService.findByEmail(createUser.email);
    if (user) {
      throw new ConflictException('User already exists');
    }
    return this.userService.createUser(createUser);
  }
}
