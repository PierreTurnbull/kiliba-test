import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';

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
}
