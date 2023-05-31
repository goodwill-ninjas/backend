import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { BloodType } from '../../common/enum/blood-type.enum';
import { GenderIdentity } from '../../common/enum/gender-identity.enum';
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
    example: 'AB Rh-',
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
    nullable: true,
  })
  @IsOptional()
  @IsNumber()
  avatar_id?: number;
}
