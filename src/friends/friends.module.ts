import { Module } from "@nestjs/common";
import { FriendsService } from "./friends.service";
import { FriendsController } from "./friends.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Friend, FriendSchema } from "./friends.schema";
import { RequestModule } from "./request/request.module";

@Module({
  imports: [
    RequestModule,
    MongooseModule.forFeature([{ name: Friend.name, schema: FriendSchema }]),
  ],
  controllers: [FriendsController],
  providers: [FriendsService],
  exports: [FriendsService],
})
export class FriendsModule {}
