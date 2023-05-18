import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserEntity } from '../user/models/user.entity';
import { LoginUserDto } from '../user/dto/login-user.dto';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { JwtPayload } from './interfaces/jwt-payload';
import EmailService from '../email/email.service';
import { ConfigService } from '@nestjs/config';
import Mail from 'nodemailer/lib/mailer';
import { UpdateResult } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly emailService: EmailService,
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

  async sendVerificationLink(email: string): Promise<Mail> {
    const token = this.jwtService.sign(
      { email },
      {
        secret: this.configService.get('VERIFICATION_JWT_SECRET'),
        expiresIn: this.configService.get('VERIFICATION_JWT_EXPIRE'),
      },
    );

    const url = `${this.configService.get(
      'VERIFICATION_URI',
    )}/api/auth/verify-email?token=${token}`;

    return this.emailService.sendMail({
      to: email,
      subject: 'Witaj w Blood Donor!',
      text: `Witaj w Blood Donor. Kliknij w link żeby zakończyć rejestrację i aktywować swoje konto: ${url}`,
    });
  }

  async confirmEmailVerification(token: string): Promise<UpdateResult> {
    try {
      const payload = await this.jwtService.verify(token, {
        secret: this.configService.get('VERIFICATION_JWT_SECRET'),
      });

      if (typeof payload === 'object' && 'email' in payload) {
        const user = await this.userService.findUserByEmail(payload.email);
        if (user.has_verified_email) {
          throw new HttpException(
            'Email already verified',
            HttpStatus.BAD_REQUEST,
          );
        }
        return await this.userService.updateUserEmailVerification(user.id);
      }
      throw new Error();
    } catch (error) {
      if (error?.name === 'TokenExpiredError') {
        throw new HttpException(
          'Email confirmation token expired',
          HttpStatus.BAD_REQUEST,
        );
      }
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
