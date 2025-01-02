import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({ timestamps: true })
export class Friend extends Document {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  friendId: string;
}

export const FriendSchema = SchemaFactory.createForClass(Friend);
