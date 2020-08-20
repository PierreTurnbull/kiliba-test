import { Controller, Get, Query, Post, Body, ConflictException } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUsersRequestBodyDTO } from './createUsers.request.body.dto';
import { GetUsersRequestQueryDTO } from './getUsers.request.query.dto';
import { CreateUserRequestBodyDTO } from './createUser.request.body.dto';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/')
  async getUsers(@Query() query: GetUsersRequestQueryDTO) {
    const { email } = query
    const users = await this.userService.getUsers(email)
    return users;
  }

  @Post('/')
  async createUsers(@Body() body: CreateUsersRequestBodyDTO) {
    const users: CreateUserRequestBodyDTO[] = body.users
    const { alreadyExistingUsers } = await this.userService.createUsers(users)
    if (alreadyExistingUsers.length > 0) {
      throw new ConflictException({
        message: `Could not create: ${JSON.stringify(alreadyExistingUsers)}`
      })
    }
  }
}
