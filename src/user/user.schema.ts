import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as bcrypt from 'bcrypt';

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, select: false, type: String })
  password: string;
  @Prop({
    type: { type: String, default: 'Point' },
    coordinates: { type: [Number], required: true, index: '2dsphere' },
  })
  location: {
    type: string;
    coordinates: [number, number]; // [longitude, latitude]
  };
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});
