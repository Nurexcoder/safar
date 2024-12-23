import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/CreateUser.dto';
import { AuthResponse } from './auth';
import { LoginDto } from './dto/Login.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('signup')
  @ApiOperation({ summary: 'Sign up a new user' })
  async signup(@Body() createUser: CreateUserDto): Promise<AuthResponse> {
    return this.authService.signUp(createUser);
  }

  @ApiOperation({ summary: 'Log in a user' })
  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<AuthResponse> {
    return this.authService.login(loginDto);
  }
}
