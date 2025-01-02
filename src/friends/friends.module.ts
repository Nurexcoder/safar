import { Module } from "@nestjs/common";
import { FriendsService } from "./friends.service";
import { FriendsController } from "./friends.controller";
import { RequestModule } from './request/request.module';

@Module({
  controllers: [FriendsController],
  providers: [FriendsService],
  imports: [RequestModule],
})
export class FriendsModule {}
