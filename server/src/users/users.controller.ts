import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserAddDto } from './dto/user-add.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {
  }

  @Get('/:uid')
  getUser(@Param() { uid }) {
    try {
      return this.userService.getUser(uid);
    } catch (e) {
      throw e;
    }
  }

  @Get('/search/:nick')
  searchUser(@Param() { nick }) {
    try {
      return this.userService.searchUser(nick);
    } catch (e) {
      throw e;
    }
  }

  @Post('/add')
  addUserToFriend(@Body() data: UserAddDto) {
    try {
      return this.userService.addUserToFriend(data);
    } catch (e) {
      throw e;
    }
  }
}
