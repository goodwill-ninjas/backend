import {
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import {
  ApiBearerAuth,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { UserEntity } from './models/user.entity';
import { DonationEntity } from '../donation/models/donation.entity';
import { FeatEntity } from '../feat/models/feat.entity';

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

  // @Get(':id/feats')
  // @ApiBearerAuth()
  // @ApiOperation({
  //   summary: 'Get User Feats',
  //   description:
  //     'List current feat status for given user - completed feats and their next ranks.',
  // })
  // @ApiOkResponse({
  //   type: FeatEntity,
  //   isArray: true,
  //   description: 'List of completed feats and their next ranks for given user',
  // })
  // @ApiNotFoundResponse({
  //   description: 'User with given id does not exist',
  // })
  // async getUserFeats(
  //   @Param('id', ParseIntPipe) id: number,
  // ): Promise<FeatEntity[]> {
  //   return await this.userService.findUserFeats(id);
  // }

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
}
