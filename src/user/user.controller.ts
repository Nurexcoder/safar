import {
  Body,
  Controller,
  Request,
  Post,
  UseGuards,
  Get,
} from "@nestjs/common";
import { UserService } from "./user.service";
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { User } from "./user.schema";
import { CreateBulkUsersDto } from "src/auth/dto/CreateUser.dto";
import { JwtAuthGuard } from "src/auth/gaurds/jwt-auth.guard";
import { UserDto } from "./dto/User.dto";
import { UserResponseDto } from "./dto/UsersResponse.dto";

@ApiTags("user")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get("nearby")
  @ApiOperation({ summary: "Get nearby users" })
  @ApiResponse({
    status: 200,
    description: "Users fetched successfully",
    type: [UserResponseDto],
  })
  async getNearbyUsers(@Request() req): Promise<UserResponseDto> {
    const users = await this.userService.getNearbyUsers(req);
    return {
      code: 200,
      message: "Users fetched successfully",
      data: users,
    };
  }
  @ApiOperation({ summary: "Create bulk users" })
  @ApiResponse({
    status: 201,
    description: "Users created successfully",
    type: [UserDto],
  })
  @Post("bulk")
  async createBulkUsers(
    @Body() createBulkUsersDto: CreateBulkUsersDto,
  ): Promise<UserResponseDto> {
    const users = await this.userService.createBulkUsers(createBulkUsersDto);
    return {
      code: 201,
      message: "Users created successfully",
      data: users,
    };
  }
}
