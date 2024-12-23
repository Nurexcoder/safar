import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsEmail, IsArray, Min } from "class-validator";

export class CreateUserDto {
  @ApiProperty({ type: "string" })
  @IsEmail()
  email: string;

  @ApiProperty({ type: "string" })
  @IsString()
  name: string;

  @ApiProperty({ type: "string" })
  @IsString()
  @Min(6, { message: "Password must be at least 6 characters long" })
  password: string;
  @ApiProperty({ type: "string", enum: ["Point"] })
  @IsString()
  locationType: string;

  @ApiProperty({
    type: "array",
    items: { type: "number" },
    minItems: 2,
    description: "Longitude and latitude",
  })
  @IsArray()
  coordinates: [number, number]; // [longitude, latitude]
}
export class CreateBulkUsersDto {
  @IsArray()
  @ApiProperty({ type: [CreateUserDto] })
  users: CreateUserDto[];
}
