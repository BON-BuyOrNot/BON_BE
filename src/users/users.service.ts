import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { UsersEntity } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private usersRepository: Repository<UsersEntity>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<UsersEntity> {
    const { email, password, userName } = createUserDto;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = this.usersRepository.create({
      email,
      password: hashedPassword,
      userName,
    });

    return this.usersRepository.save(newUser);
  }
}
