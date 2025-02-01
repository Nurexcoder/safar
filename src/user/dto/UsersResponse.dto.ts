import { BaseResponseDto } from "src/common/dto/base/BaseResonse.dto";
import { UserDto, UserWithDistanceDto } from "./User.dto";
import { ApiProperty } from "@nestjs/swagger";

export class UserResponseDto extends BaseResponseDto {
  @ApiProperty({ type: [UserDto] })
  data: UserDto[];
}

export class NearbyUsersResponseDto extends UserResponseDto {
  @ApiProperty({ type: [UserWithDistanceDto] })
  data: UserWithDistanceDto[];
}
