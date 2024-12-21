import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/CreateUser.dto';
import { User } from 'src/user/user.schema';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('signup')
  @ApiOperation({ summary: 'Sign up a new user' })
  async signup(@Body() createUser: CreateUserDto): Promise<User> {
    return this.authService.signUp(createUser);
  }
}
