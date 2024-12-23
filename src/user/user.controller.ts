import { Body, Controller, Request, Post, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { User } from "./user.schema";
import { CreateBulkUsersDto } from "src/auth/dto/CreateUser.dto";
import { JwtAuthGuard } from "src/auth/gaurds/jwt-auth.guard";

@ApiTags("user")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post("nearby")
  @ApiOperation({ summary: "Get nearby users" })
  async getNearbyUsers(@Request() req): Promise<User[]> {
    return this.userService.getNearbyUsers(req);
  }
  @ApiOperation({ summary: "Create bulk users" })
  @Post("bulk")
  async createBulkUsers(@Body() createBulkUsersDto: CreateBulkUsersDto) {
    return this.userService.createBulkUsers(createBulkUsersDto);
  }
}
