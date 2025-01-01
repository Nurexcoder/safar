import { ApiProperty } from "@nestjs/swagger";
import { LocationDto } from "src/common/dto/base/Location.dto";

export class UserDto {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  name: string;

  @ApiProperty({ type: LocationDto })
  location: LocationDto;

  password?: string;
}

export class UserWithDistanceDto extends UserDto {
  @ApiProperty()
  distance: number;
}
