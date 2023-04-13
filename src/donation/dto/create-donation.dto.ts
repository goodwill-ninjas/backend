import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsISO8601,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  Matches,
} from 'class-validator';
import { DonationType } from '../../common/enum/donation-type.enum';

export class CreateDonationDto {
  @ApiProperty({
    description: 'ID of user adding the donation',
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  user_id: number;

  @ApiProperty({
    description: 'ID of user accompanying the requester',
    example: 2,
    nullable: true,
  })
  @IsNumber()
  @IsOptional()
  companion_user_id?: number;

  @ApiProperty({
    description: 'Type of Blood Donation',
    example: 'whole',
  })
  @IsNotEmpty()
  @IsEnum(DonationType)
  donated_type: string;

  @ApiProperty({
    description: 'Amount of blood donated in milliliters',
    example: 450,
  })
  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @ApiProperty({
    description: 'Systolic and diastolic pressure at the time of donation',
    example: '170/90',
    nullable: true,
  })
  @Matches(/^\d{1,3}\/\d{1,3}$/, {
    message:
      "blood_pressure must be a string containing two numbers separated by '/' character, each number has maximum length of 3,",
  })
  blood_pressure?: string;

  @ApiProperty({
    description: 'Hemoglobin levels in g/l',
    example: 140,
    nullable: true,
  })
  hemoglobin?: number;

  @ApiProperty({
    description: 'User comments regarding the donation',
    example: 'Nurse warned me about low hemoglobin levels.',
    nullable: true,
  })
  details?: string;

  @ApiProperty({
    description: 'Time of the donation',
    example: '2002-02-02T22:22:22.22Z',
  })
  @IsNotEmpty()
  @IsISO8601({
    strict: false,
    strictSeparator: true,
  })
  donated_at: string;
}
