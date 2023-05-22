import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from '../user/dto/login-user.dto';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserEntity } from '../user/models/user.entity';
import { HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import EmailService from '../email/email.service';

describe('AuthService', () => {
  const mockToken = 'mock_token';

  let authService: AuthService;

  const mockUserService = {
    findUserByEmail: jest.fn(),
    createUser: jest.fn(),
  };

  const mockConfigService = {
    get: jest.fn(),
  };

  const mockEmailService = {
    sendMail: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        AuthService,
        UserService,
        JwtService,
        ConfigService,
        EmailService,
      ],
    })
      .overrideProvider(UserService)
      .useValue(mockUserService)
      .overrideProvider(ConfigService)
      .useValue(mockConfigService)
      .overrideProvider(EmailService)
      .useValue(mockEmailService)
      .compile();

    authService = module.get<AuthService>(AuthService);
  });

  it('Should be defined', () => {
    expect(authService).toBeDefined();
  });

  it('Returns JWT token if login credentials are valid', async () => {
    const mockDto: LoginUserDto = {
      email: 'test@example.com',
      password: 'correct_password',
    };

    jest.spyOn(authService, 'login').mockImplementation(async () => ({
      token: mockToken,
    }));

    const result = await authService.login(mockDto);

    expect(result).toEqual({ token: mockToken });
    expect(authService.login).toHaveBeenCalledWith(mockDto);
  });

  it('Throw an error if the credentials are invalids', async () => {
    const mockDto: LoginUserDto = {
      email: 'test@example.com',
      password: 'wrong_password',
    };

    jest.spyOn(authService, 'login').mockImplementation(async () => {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    });

    await expect(authService.login(mockDto)).rejects.toThrow(HttpException);
    expect(authService.login).toHaveBeenCalledWith(mockDto);
  });

  it('Creates and return the user', async () => {
    const dto = new CreateUserDto();
    const user = new UserEntity();

    jest.spyOn(authService, 'register').mockImplementation(async () => user);

    const result = await authService.register(dto);

    expect(result).toEqual(user);
    expect(authService.register).toHaveBeenCalledWith(dto);
  });
});
