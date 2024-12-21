import { Body, Controller, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from './user.schema';
import { CreateBulkUsersDto } from 'src/auth/dto/CreateUser.dto';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post('nearby/:userId')
  @ApiOperation({ summary: 'Get nearby users' })
  async getNearbyUsers(@Param('userId') userId: string): Promise<User[]> {
    return this.userService.getNearbyUsers(userId);
  }
  @ApiOperation({ summary: 'Create bulk users' })
  @Post('bulk')
  async createBulkUsers(@Body() createBulkUsersDto: CreateBulkUsersDto) {
    return this.userService.createBulkUsers(createBulkUsersDto);
  }
}
