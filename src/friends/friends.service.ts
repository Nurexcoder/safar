import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Friend } from "./friends.schema";
import { Model } from "mongoose";

@Injectable()
export class FriendsService {
  constructor(
    @InjectModel(Friend.name) private readonly friendModel: Model<Friend>,
  ) {}
  getFriends() {}

  async isAlreadyFriend(senderId: string, receiverId: string) {
    const friend = await this.friendModel.findOne({
      $or: [
        { userId: senderId, friendId: receiverId },
        { userId: receiverId, friendId: senderId },
      ],
    });
    return friend ? true : false;
  }
  async addFriend(senderId: string, receiverId: string) {
    const friend = await this.friendModel.create({
      userId: senderId,
      friendId: receiverId,
    });
    return friend;
  }
}
