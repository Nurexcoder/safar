import { ApiProperty } from "@nestjs/swagger";

export class LocationDto {
  @ApiProperty({ default: "Point" })
  type: string;

  @ApiProperty({
    type: [Number],
    description: "[longitude, latitude]",
    isArray: true,
    minItems: 2,
    maxItems: 2,
    default: [0, 0],
  })
  coordinates: [number, number];
}
