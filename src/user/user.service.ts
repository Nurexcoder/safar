import { Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "./user.schema";
import { CreateBulkUsersDto, CreateUserDto } from "src/auth/dto/CreateUser.dto";
import { UserDto, UserWithDistanceDto } from "./dto/User.dto";

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);
  constructor(@InjectModel("User") private readonly userModel: Model<User>) {}
  async findByEmail(email: string, select?: "+password"): Promise<User | null> {
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
        type: "Point",
        coordinates: createUserDto.coordinates,
      },
    });
    await createdUser.save();

    return createdUser;
  }
  async getNearbyUsers(req): Promise<UserWithDistanceDto[]> {
    const userId = req?.user?._id;
    const user = await this.userModel.findById(userId).exec();
    if (!user) {
      throw new Error("User not found");
    }
    const location = user.location.coordinates;
    const [longitude, latitude] = location;

    const withDistanceFromUser: UserWithDistanceDto[] =
      await this.userModel.aggregate([
        {
          $geoNear: {
            near: { type: "Point", coordinates: [longitude, latitude] },
            distanceField: "distance",
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
            distance: { $round: [{ $divide: ["$distance", 1000] }, 2] }, // Convert to km and round to 2 decimal places
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
  ): Promise<UserDto[]> {
    try {
      const usersToInsert = createBulkUsersDto.users.map((user) => ({
        ...user,
        location: {
          type: "Point",
          coordinates: user.coordinates,
        },
      }));

      const insertedUsers = await this.userModel.insertMany(usersToInsert);

      return insertedUsers.map((user) => ({
        email: user.email,
        name: user.name,
        location: user.location,
      })) as UserDto[];
    } catch (error) {
      this.logger.error("Failed to create bulk users", error.stack);
      throw new Error("Failed to create bulk users");
    }
  }
}
