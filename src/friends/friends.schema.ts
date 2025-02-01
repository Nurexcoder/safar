import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { User } from "src/user/user.schema";
import { FriendStatus } from "./friends.types";

@Schema({ timestamps: true })
export class Friend extends Document {
  @Prop({ required: true, type: Types.ObjectId, ref: User.name })
  userId: string;

  @Prop({ required: true })
  friendId: string;

  @Prop({ required: true, default: FriendStatus.Pending })
  status: FriendStatus;
}

export const FriendSchema = SchemaFactory.createForClass(Friend);
