import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LoginDto } from './dto/login.dto';
import { RegistrationDto } from './dto/registration.dto';
import { User, UserDocument } from '../users/schemas/users.schema';
import { UsersResponseDto } from '../users/dto/users-response.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>, private readonly usersService: UsersService) {
  }

  async login(data: LoginDto): Promise<UsersResponseDto> {
    const update = await this.userModel.findOneAndUpdate(data, {
      token: Date.now().toString()
    });
    if (update) {
      const user = await this.userModel.findOne({ email: data.email });
      return this.usersService.getResponseUser(user);
    } else {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
  }

  async registration(data: RegistrationDto): Promise<UsersResponseDto> {
    const findByEmail = await this.userModel
      .find({ email: data.email })
      .exec();
    const findByNick = await this.userModel.find({ nick: data.nick }).exec();
    if (findByEmail.length) throw new HttpException('User with this email has already registered', HttpStatus.BAD_REQUEST);
    if (findByNick.length) throw new HttpException('User with this nick has already registered', HttpStatus.BAD_REQUEST);
    const user = new this.userModel({
      ...data,
      token: Date.now().toString()
    });
    await user.save();
    return this.usersService.getResponseUser(user);
  }

  async logout(uid: string): Promise<{}> {
    try {
      await this.userModel.findByIdAndUpdate(uid, { token: '' });
      return {};
    } catch (e) {
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    }
  }
}
