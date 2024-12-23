import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { UserService } from "src/user/user.service";
import { CreateUserDto } from "./dto/CreateUser.dto";
import { User } from "src/user/user.schema";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { AuthResponse } from "./auth";
import { LoginDto } from "./dto/Login.dto";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.userService.findByEmail(email, "+password");
    if (!user) {
      return null;
    }

    const hashedPassword = user.password;
    if (await bcrypt.compare(password, hashedPassword)) {
      return user;
    }
    return null;
  }

  generateAuthResponse(user: User): AuthResponse {
    const jwtPayload = { email: user.email, sub: user._id };
    const accessToken = this.jwtService.sign(jwtPayload);
    return {
      email: user.email,
      name: user.name,
      location: user.location,
      accessToken,
    };
  }

  async login(loginDto: LoginDto): Promise<AuthResponse> {
    const user = await this.validateUser(loginDto.email, loginDto.password);
    if (!user) {
      throw new NotFoundException("Invalid email or password");
    }
    return this.generateAuthResponse(user);
  }

  async signUp(createUser: CreateUserDto): Promise<AuthResponse> {
    const user = await this.userService.findByEmail(createUser.email);
    if (user) {
      throw new ConflictException("User already exists");
    }

    const createdUser = await this.userService.createUser(createUser);

    return this.generateAuthResponse(createdUser);
  }
}
