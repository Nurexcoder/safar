import { ApiProperty } from "@nestjs/swagger";
export class BaseResponseDto {
  @ApiProperty()
  code: number;

  @ApiProperty()
  message: string;

  @ApiProperty()
  data: any;
}
