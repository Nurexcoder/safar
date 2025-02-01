import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CreateUserDto } from "./dto/CreateUser.dto";
import { LoginDto } from "./dto/Login.dto";
import { AuthResponseDto } from "./dto/AuthResponse.dto";

@ApiTags("auth")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post("signup")
  @ApiOperation({ summary: "Sign up a new user" })
  @ApiResponse({
    status: 201,
    description: "User signed up successfully",
    type: AuthResponseDto,
  })
  async signup(@Body() createUser: CreateUserDto): Promise<AuthResponseDto> {
    return this.authService.signUp(createUser);
  }

  @ApiOperation({ summary: "Log in a user" })
  @ApiResponse({
    status: 200,
    description: "User logged in successfully",
    type: AuthResponseDto,
  })
  @Post("login")
  async login(@Body() loginDto: LoginDto): Promise<AuthResponseDto> {
    return this.authService.login(loginDto);
  }
}
