import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpCode,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from '../user/dto/login-user.dto';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserEntity } from '../user/models/user.entity';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiExcludeEndpoint,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Public } from './guard/public-route.decorator';

@ApiTags('Auth')
@UseInterceptors(ClassSerializerInterceptor)
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    summary: 'Login User',
    description: 'Authorizes user and returns a valid JWT token.',
  })
  @ApiOkResponse({
    description: 'Successfully logged in',
  })
  @ApiUnauthorizedResponse({
    description: 'Invalid credentials',
  })
  @Public()
  @Post('login')
  @HttpCode(200)
  login(@Body() body: LoginUserDto): Promise<{ token: string }> {
    return this.authService.login(body);
  }

  @ApiOperation({
    summary: 'Register User',
    description: 'Tries to register a new user.',
  })
  @ApiCreatedResponse({
    type: UserEntity,
    description:
      'Registered user object with related user settings as response',
  })
  @ApiConflictResponse({
    description: 'Email or Username already taken.',
  })
  @ApiBadRequestResponse({
    description: 'Registration creation failed. Please check request body',
  })
  @Public()
  @Post('register')
  @HttpCode(201)
  async register(@Body() body: CreateUserDto): Promise<UserEntity> {
    const registeredUser = await this.authService.register(body);
    await this.authService.sendVerificationLink(body.email);
    return registeredUser;
  }

  @ApiExcludeEndpoint()
  @Public()
  @Get('verify-email')
  async confirmEmail(@Query('token') token: string): Promise<void> {
    await this.authService.confirmEmailVerification(token);
  }
}
