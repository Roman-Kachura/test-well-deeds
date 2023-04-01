import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/users.schema';
import { UsersResponseDto } from './dto/users-response.dto';
import { UserAddDto } from './dto/user-add.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async getUser(uid: string): Promise<UsersResponseDto> {
    const user = await this.userModel.findById(uid).exec();
    if (user) return this.getResponseUser(user);
    throw new HttpException('User not found', HttpStatus.NOT_FOUND);
  }

  async searchUser(nick: string): Promise<UsersResponseDto> {
    const user = await this.userModel.findOne({ nick });
    return this.getResponseUser(user);
  }

  async addUserToFriend(data: UserAddDto): Promise<UsersResponseDto> {
    const user = await this.userModel.findById(data.authId);
    if (user.friends.includes(data.uid)) {
      throw new HttpException(
        'You already have this user in frineds!',
        HttpStatus.BAD_REQUEST,
      );
    }
    user.friends.push(data.uid);
    user.save();
    const res = await this.userModel.findById(data.authId);
    return this.getResponseUser(res);
  }

  getResponseUser(user: User): UsersResponseDto {
    return {
      uid: user._id,
      nick: user.nick,
      token: user.token,
      friends: user.friends,
      name: user.name,
      email: user.email,
    };
  }
}
