import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './models/user.entity';
import { DonationEntity } from '../donation/models/donation.entity';

@ApiTags('User Management')
@UseInterceptors(ClassSerializerInterceptor)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({
    summary: 'Get Users',
    description: 'Returns a list of all users.',
  })
  @ApiOkResponse({
    type: UserEntity,
    isArray: true,
    description: 'List of registered users',
  })
  async getUsers(): Promise<UserEntity[]> {
    return await this.userService.findUsers();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get User',
    description: 'Tries to find a single user matching the given id.',
  })
  @ApiOkResponse({
    type: UserEntity,
    description: 'Finds user with matching id',
  })
  @ApiNotFoundResponse({
    description: 'User with given id does not exist',
  })
  async getUser(@Param('id', ParseIntPipe) id: number): Promise<UserEntity> {
    return await this.userService.findUserById(id);
  }

  @Get(':id/donations')
  @ApiOperation({
    summary: 'Get User Donations',
    description: 'List all donations for given user.',
  })
  @ApiOkResponse({
    type: DonationEntity,
    isArray: true,
    description: 'List of donations registered by given user',
  })
  @ApiNotFoundResponse({
    description: 'User with given id does not exist',
  })
  async getUserDonations(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<DonationEntity[]> {
    return await this.userService.findUserDonations(id);
  }

  @Post()
  @ApiOperation({
    summary: 'Register User',
    description: 'Tries to save a new user.',
  })
  @ApiCreatedResponse({
    type: UserEntity,
    description: 'Created user object with related user settings as response',
  })
  @ApiBadRequestResponse({
    description: 'User creation failed. Please check request body',
  })
  async registerUser(@Body() body: CreateUserDto): Promise<UserEntity> {
    return await this.userService.createUser(body);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({
    summary: 'Delete User',
    description: 'Tries to delete an user if user with given id exists.',
  })
  @ApiNoContentResponse({
    description: 'User successfully deleted',
  })
  @ApiNotFoundResponse({
    description: 'User with given id does not exist',
  })
  async deleteUser(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.userService.removeUser(id);
  }
}
