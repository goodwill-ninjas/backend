import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({
    description: 'New user email',
    example: 'foo@bar.com',
    nullable: true,
  })
  @IsOptional()
  @IsString()
  email?: string;

  @ApiProperty({
    description: 'New user login',
    example: 'Mary_02',
    nullable: true,
  })
  @IsOptional()
  @IsString()
  username?: string;

  @ApiProperty({
    description: 'New theme of the application',
    example: 'default',
    nullable: true,
  })
  @IsOptional()
  @IsString()
  theme?: string;

  @ApiProperty({
    description: 'New font size',
    example: 'standard',
    nullable: true,
  })
  @IsOptional()
  @IsString()
  fontSize?: string;

  @ApiProperty({
    description:
      'Whether user will receive notifications about upcoming events',
    example: true,
    nullable: true,
  })
  @IsOptional()
  @IsBoolean()
  eventNotifications?: boolean;

  @ApiProperty({
    description:
      'Whether user will receive notifications about upcoming donations',
    example: true,
    nullable: true,
  })
  @IsOptional()
  @IsBoolean()
  reminderNotifications?: boolean;
}
