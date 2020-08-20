import { Controller, Get, Query } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/')
  getUsers(@Query() query) {
    const { email } = query
    const users = this.userService.getUsers(email)
    return users;
  }
}
