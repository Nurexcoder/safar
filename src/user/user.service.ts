import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';
import { CreateBulkUsersDto, CreateUserDto } from 'src/auth/dto/CreateUser.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}
  async findByEmail(email: string, select?: 'password'): Promise<User> {
    return this.userModel.findOne({ email }).select(select).exec();
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel({
      ...createUserDto,
      location: {
        type: 'Point',
        coordinates: createUserDto.coordinates,
      },
    });
    await createdUser.save();

    return createdUser;
  }
  async getNearbyUsers(userId: string): Promise<User[]> {
    const user = await this.userModel.findById(userId).exec();
    if (!user) {
      throw new Error('User not found');
    }
    const location = `${user.location.coordinates[0]},${user.location.coordinates[1]}`;
    const nearbyUsers = await this.userModel
      .find({
        'location.coordinates': {
          $geoWithin: {
            $centerSphere: [
              [
                parseFloat(location.split(',')[0]),
                parseFloat(location.split(',')[1]),
              ],
              4 / 3963.2,
            ],
          },
        },
      })
      .exec();

    return nearbyUsers;
  }
  async createBulkUsers(
    createBulkUsersDto: CreateBulkUsersDto,
  ): Promise<User[]> {
    const usersToInsert = createBulkUsersDto.users.map((user) => ({
      ...user,
      location: {
        type: 'Point',
        coordinates: user.coordinates,
      },
    }));
    return this.userModel.insertMany(usersToInsert);
  }
}
