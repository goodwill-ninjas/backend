import {
  IsEnum,
  IsISO8601,
  IsNotEmpty,
  IsNotEmptyObject,
  IsObject,
  IsOptional,
  IsUrl,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { BloodStatus } from '../../common/enum/blood-status.enum';

class BloodBankDetailsType {
  @ApiProperty({
    description: '0 Rh- blood type status',
    example: 'MODERATE',
  })
  @IsNotEmpty()
  @IsEnum(BloodStatus)
  '0 Rh-': string;

  @ApiProperty({
    description: '0 Rh+ blood type status',
    example: 'MODERATE',
  })
  @IsNotEmpty()
  @IsEnum(BloodStatus)
  '0 Rh+': string;

  @ApiProperty({
    description: 'A Rh- blood type status',
    example: 'MODERATE',
  })
  @IsNotEmpty()
  @IsEnum(BloodStatus)
  'A Rh-': string;

  @ApiProperty({
    description: 'A Rh+ blood type status',
    example: 'MODERATE',
  })
  @IsNotEmpty()
  @IsEnum(BloodStatus)
  'A Rh+': string;

  @ApiProperty({
    description: 'B Rh- blood type status',
    example: 'MODERATE',
  })
  @IsNotEmpty()
  @IsEnum(BloodStatus)
  'B Rh-': string;

  @ApiProperty({
    description: 'B Rh+ blood type status',
    example: 'MODERATE',
  })
  @IsNotEmpty()
  @IsEnum(BloodStatus)
  'B Rh+': string;

  @ApiProperty({
    description: 'AB Rh- blood type status',
    example: 'MODERATE',
  })
  @IsNotEmpty()
  @IsEnum(BloodStatus)
  'AB Rh-': string;

  @ApiProperty({
    description: 'AB Rh+ blood type status',
    example: 'MODERATE',
  })
  @IsNotEmpty()
  @IsEnum(BloodStatus)
  'AB Rh+': string;
}

export class SaveBloodCenterDetailsDto {
  @ApiProperty({
    description: 'Timestamp provided by the scraper',
    example: '2002-02-02T22:22:22.22Z',
  })
  @IsNotEmpty()
  @IsISO8601({
    strict: false,
    strictSeparator: true,
  })
  datetime_modified: string;

  @ApiProperty({
    description: 'Source of data provided by the scraper',
    example: 'https://google.com/',
  })
  @IsUrl()
  @IsOptional()
  url_src: string;

  @ApiProperty({
    description:
      'Object containing Cities as Object Keys with a set of corresponding "BloodBankDetailsType" values',
    example: {
      Gdańsk: {
        '0 Rh-': 'CRITICAL',
        '0 Rh+': 'CRITICAL',
        'A Rh-': 'STOP',
        'A Rh+': 'STOP',
        'B Rh-': 'ALMOST_FULL',
        'B Rh+': 'MODERATE',
        'AB Rh-': 'ALMOST_FULL',
        'AB Rh+': 'STOP',
      },
    },
    type: BloodBankDetailsType,
  })
  @IsNotEmptyObject()
  @IsObject()
  blood_banks: Map<string, BloodBankDetailsType>;
}
