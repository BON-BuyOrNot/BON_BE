import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersEntity } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('signup')
  async signUp(@Body() createUserDto: CreateUserDto): Promise<UsersEntity> {
    return this.usersService.createUser(createUserDto);
  }
 @Post('login')
 async login(@Body() createUserDto: CreateUserDto): Promise<UsersEntity> {
    return this.usersService.createUser(createUserDto);
    }
}
