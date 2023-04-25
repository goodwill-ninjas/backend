import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserEntity } from '../user/models/user.entity';
import { LoginUserDto } from '../user/dto/login-user.dto';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { JwtPayload } from './interfaces/jwt-payload';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  private async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 12);
  }

  private async comparePasswords(
    inputPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(inputPassword, hashedPassword);
  }

  private async validateUser(
    email: string,
    password: string,
  ): Promise<UserEntity> {
    const user = await this.userService.findUserByEmail(email);
    if (await this.comparePasswords(password, user.password)) return user;
  }

  async login(dto: LoginUserDto): Promise<{ token: string }> {
    const user = await this.validateUser(dto.email, dto.password);
    if (!user)
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);

    const payload: JwtPayload = {
      iss: 'blooddonor',
      context: {
        user: {
          userId: user.id,
          displayName: user.username,
        },
      },
    };

    return {
      token: await this.jwtService.signAsync(payload),
    };
  }

  async register(dto: CreateUserDto): Promise<UserEntity> {
    dto.password = await this.hashPassword(dto.password);
    return await this.userService.createUser(dto);
  }
}
