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
    description: 'List of registered users',
  })
  getUsers(): Promise<UserEntity[]> {
    return this.userService.findUsers();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get User',
    description: 'Tries to find a single user matching the given id.',
  })
  @ApiOkResponse({
    description: 'Finds user with matching id',
  })
  @ApiNotFoundResponse({
    description: 'User with given id does not exist',
  })
  async getUser(@Param('id', ParseIntPipe) id: number): Promise<UserEntity> {
    return await this.userService.findUserById(id);
  }

  @Post()
  @ApiOperation({
    summary: 'Register User',
    description: 'Tries to save a new user.',
  })
  @ApiCreatedResponse({
    description: 'Created user object with related user settings as response',
    type: UserEntity,
  })
  @ApiBadRequestResponse({
    description: 'User creation failed. Please check request body',
  })
  registerUser(@Body() body: CreateUserDto): Promise<UserEntity> {
    return this.userService.createUser(body);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({
    summary: 'Delete User',
    description: 'Tries to delete an user if user with given id exists.',
  })
  @ApiNoContentResponse({
    description: 'Deletes user with matching id',
  })
  @ApiNotFoundResponse({
    description: 'User with given id does not exist',
  })
  async deleteUser(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.userService.remove(id);
  }
}
