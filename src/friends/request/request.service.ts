import { BadRequestException, Injectable } from "@nestjs/common";
import { FriendsService } from "../friends.service";
import { RequestExtented } from "src/common/types/Extended";

@Injectable()
export class RequestService {
  constructor(private readonly friendsService: FriendsService) {}
  async sendRequest(receiverId: string, request: RequestExtented) {
    const userId = request.user?._id as string;
    const isAlreadyFriend = await this.friendsService.isAlreadyFriend(
      receiverId,
      userId,
    );
    if (isAlreadyFriend) {
      throw new BadRequestException("You are already friends");
    }

    const friend = await this.friendsService.addFriend(userId, receiverId);
    return friend;
  }
}
