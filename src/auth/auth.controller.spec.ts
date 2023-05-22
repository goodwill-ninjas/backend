import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserEntity } from '../user/models/user.entity';
import EmailService from '../email/email.service';
import { ConfigService } from '@nestjs/config';

describe('AuthController', () => {
  const mockToken = 'mock_token';

  let controller: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            register: jest.fn(),
            login: jest.fn(),
            sendVerificationLink: jest.fn(),
          },
        },
        {
          provide: EmailService,
          useValue: {
            sendMail: jest.fn(),
          },
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('Should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('Returns JWT token if login credentials are valid', async () => {
    const dto = {
      email: 'test@example.com',
      password: 'correct_password',
    };

    jest.spyOn(authService, 'login').mockResolvedValue({ token: mockToken });
    const result = await controller.login(dto);

    expect(result).toEqual({ token: mockToken });
    expect(authService.login).toHaveBeenCalledWith(dto);
  });

  it('Throws an error if the credentials are invalid', async () => {
    const dto = {
      email: 'test@example.com',
      password: 'bad_password',
    };

    jest.spyOn(authService, 'login').mockRejectedValue(new Error());

    await expect(controller.login(dto)).rejects.toThrow();
    expect(authService.login).toHaveBeenCalledWith(dto);
  });

  it('Register an user and returns the user object', async () => {
    const dto = new CreateUserDto();
    const user = new UserEntity();

    jest.spyOn(authService, 'register').mockResolvedValue(user);
    const result = await controller.register(dto);

    expect(result).toEqual(user);
    expect(authService.register).toHaveBeenCalledWith(dto);
  });
});
