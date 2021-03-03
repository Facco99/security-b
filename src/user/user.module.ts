import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth/auth.service';

@Module({
  controllers: [UserController],
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secretOrPrivateKey: 'secret12356789',
    }),
  ],
  providers: [UserService, AuthService],
  exports: [UserService],
})
export class UserModule {}
