import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { Observable } from 'rxjs';
import { IUser } from './models/user.interface';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  add(@Body() user: IUser): Observable<IUser> {
    return this.userService.add(user);
  }

  @Get()
  findAll(): Observable<IUser[]> {
    return this.userService.findAll();
  }
}
