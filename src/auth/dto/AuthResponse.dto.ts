import { BaseResponseDto } from "src/common/dto/base/BaseResonse.dto";
import { ApiProperty } from "@nestjs/swagger";
import { User } from "src/user/user.schema";
import { LocationDto } from "src/common/dto/base/Location.dto";

export class AuthResponseDataDto {
  @ApiProperty()
  email: string;

  @ApiProperty()
  name: string;

  @ApiProperty({ type: LocationDto, description: "User's location" })
  location: LocationDto;

  @ApiProperty()
  accessToken: string;
}
export class AuthResponseDto extends BaseResponseDto {
  @ApiProperty({ type: AuthResponseDataDto })
  data: AuthResponseDataDto;
}
