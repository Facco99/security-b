import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const createUser = this.userRepository.create(createUserDto);
    return await this.userRepository.save(createUser);
  }

  findAll() {
    return `This action returns all user`;
  }

  async findOne(id: number) {
    const userById = await this.userRepository.findOne(id);
    if (userById) return userById;
    throw new HttpException(
      {
        status: HttpStatus.FORBIDDEN,
        error: `user not found for provided id:${id}`,
      },
      HttpStatus.FORBIDDEN,
    );
  }

  async findByEmail(email: string) {
    const userByEmail = await this.userRepository.findOne({
      where: {
        email,
      },
    });
    if (userByEmail) return userByEmail;
    throw new HttpException(
      {
        status: HttpStatus.FORBIDDEN,
        error: `user not found for provided email:${email}`,
      },
      HttpStatus.FORBIDDEN,
    );
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
