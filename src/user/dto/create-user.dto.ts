import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { BloodType } from '../models/blood-type.model';
import { GenderIdentity } from '../models/gender-identity.model';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'User email',
    example: 'foo@bar.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'User login',
    example: 'Mary_02',
  })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({
    description: 'User password',
    example: 'secret',
  })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({
    description: 'User blood type',
    example: 'AB-',
  })
  @IsNotEmpty()
  @IsEnum(BloodType)
  blood_type: string;

  @ApiProperty({
    description: 'User gender',
    example: 'Female',
  })
  @IsNotEmpty()
  @IsEnum(GenderIdentity)
  gender: string;

  @ApiProperty({
    description: 'User avatar id',
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  avatar_id: number;
}
