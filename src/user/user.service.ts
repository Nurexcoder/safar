import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';
import { CreateBulkUsersDto, CreateUserDto } from 'src/auth/dto/CreateUser.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}
  async findByEmail(email: string, select?: '+password'): Promise<User | null> {
    const query = this.userModel.findOne({ email });
    if (select) {
      query.select(select);
    }
    return query.exec(); // Avoid using `.lean()` if you need Mongoose document methods
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
    const location = user.location.coordinates;
    const [longitude, latitude] = location;
    // const nearbyUsers = await this.userModel
    //   .find({
    //     'location.coordinates': {
    //       $geoWithin: {
    //         $centerSphere: [[longitude, latitude], 4 / 3963.2],
    //       },
    //     },
    //   })
    //   .exec();
    const withDistanceFromUser = await this.userModel.aggregate([
      {
        $geoNear: {
          near: { type: 'Point', coordinates: [longitude, latitude] },
          distanceField: 'distance',
          spherical: true,
        },
      },
      {
        $match: { email: { $ne: user.email } },
      },
      {
        $project: {
          email: 1,
          name: 1,
          location: 1,
          distance: { $round: [{ $divide: ['$distance', 1000] }, 2] }, // Convert to km and round to 2 decimal places
        },
      },
      {
        $sort: { distance: 1 }, // Sort by distance in ascending order
      },
    ]);

    return withDistanceFromUser;
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
