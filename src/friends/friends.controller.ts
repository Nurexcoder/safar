import { Controller, Get } from "@nestjs/common";
import { FriendsService } from "./friends.service";
import { ApiOperation, ApiTags } from "@nestjs/swagger";

@ApiTags("friends")
@Controller("friends")
export class FriendsController {
  constructor(private readonly friendsService: FriendsService) {}

  @ApiOperation({ summary: "Get all friends" })
  @Get("/")
  getFriends() {}
}
