import { Controller, Get, Query, Post, Body, ForbiddenException, ConflictException } from '@nestjs/common';
import { UserService } from './user.service';
import { UserRequestBodyDTO } from './user.request.body.dto';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/')
  async getUsers(@Query() query) {
    const { email } = query
    const users = await this.userService.getUsers(email)
    return users;
  }

  @Post('/')
  async createUsers(@Body() body) {
    const users: UserRequestBodyDTO[] = body.users
    const { alreadyExistingUsers } = await this.userService.createUsers(users)
    if (alreadyExistingUsers.length > 0) {
      throw new ConflictException({
        message: `Could not create: ${JSON.stringify(alreadyExistingUsers)}`
      })
    }
  }
}
