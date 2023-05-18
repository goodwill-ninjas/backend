import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Patch,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import {
  ApiBearerAuth,
  ApiConflictResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { UserEntity } from './models/user.entity';
import { DonationEntity } from '../donation/models/donation.entity';
import { UserCompletedFeat } from './dto/user-completed-feat.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserWithExperienceDetails } from './dto/user-with-experience-details.dto';

@ApiTags('User')
@UseInterceptors(ClassSerializerInterceptor)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Get Users',
    description: 'Returns a list of all users.',
  })
  @ApiOkResponse({
    type: UserEntity,
    isArray: true,
    description: 'List of registered users',
  })
  async getAllUsers(): Promise<UserEntity[]> {
    return await this.userService.findUsers();
  }

  @Get(':id')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Get User',
    description: 'Tries to find a single user matching the given id.',
  })
  @ApiOkResponse({
    type: UserWithExperienceDetails,
    description: 'Finds user with matching id',
  })
  @ApiNotFoundResponse({
    description: 'User with given id does not exist',
  })
  async getUser(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<UserWithExperienceDetails> {
    return await this.userService.findUserById(id);
  }

  @Get(':id/donations')
  @ApiBearerAuth()
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

  @Get(':id/feats')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Get User Completed Feats',
    description: 'List current feat status for given user - completed feats.',
  })
  @ApiOkResponse({
    type: UserCompletedFeat,
    isArray: true,
    description: 'List of completed feats for given user',
  })
  @ApiNotFoundResponse({
    description: 'User with given id does not exist',
  })
  async getUserFeats(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<UserCompletedFeat[]> {
    return await this.userService.findUserCompletedFeats(id);
  }

  @Delete(':id')
  @ApiBearerAuth()
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

  @Patch(':id')
  @ApiBearerAuth()
  @HttpCode(200)
  @ApiOperation({
    summary: 'Update User',
    description: 'Updates selected user details and user settings.',
  })
  @ApiConflictResponse({
    description: 'Requested email or username is already taken',
  })
  @ApiNotFoundResponse({
    description: 'User with given id does not exist',
  })
  async patchUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateUserDto,
  ): Promise<UserEntity> {
    return await this.userService.updateUser(id, body);
  }
}
