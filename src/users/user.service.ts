import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { UserRequestBodyDTO } from './user.request.body.dto';

@Injectable()
export class UserService {
  constructor(
      @InjectRepository(UserEntity)
      private readonly userRepository: Repository<UserEntity>,
  ) {}

  async getUsers(email) {
    const query = this.userRepository.createQueryBuilder('user')
    if (email) {
      query.where('email = :email')
      query.setParameter(':email', { email })
    }

    return query.getMany()
  }

  async createUsers(users: UserRequestBodyDTO[]) {
    let alreadyExistingUsers = []
    for (let i = 0; i < users.length; i++) {
      const newUser = new UserEntity()
      newUser.email = users[i].email
      newUser.username = users[i].username
      try {
        await this.userRepository.insert(newUser)
      } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
          alreadyExistingUsers.push(users[i])
        }
      }
    }
    return { alreadyExistingUsers }
  }
}
