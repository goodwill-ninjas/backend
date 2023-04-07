import {
  IsEnum,
  IsISO8601,
  IsNotEmpty,
  IsObject,
  IsUrl,
} from 'class-validator';
import { BloodStatus } from '../../common/enum/blood-status.enum';

export class SaveBloodCenterDetailsDto {
  @IsNotEmpty()
  @IsISO8601({
    strict: false,
    strictSeparator: true,
  })
  datetime_modified: string;

  @IsUrl()
  url_src?: string;

  @IsNotEmpty()
  @IsObject()
  blood_banks: Map<string, BloodBankDetailsType>;
}

class BloodBankDetailsType {
  @IsNotEmpty()
  @IsEnum(BloodStatus)
  '0 Rh-': string;

  @IsNotEmpty()
  @IsEnum(BloodStatus)
  '0 Rh+': string;

  @IsNotEmpty()
  @IsEnum(BloodStatus)
  'A Rh-': string;

  @IsNotEmpty()
  @IsEnum(BloodStatus)
  'A Rh+': string;

  @IsNotEmpty()
  @IsEnum(BloodStatus)
  'B Rh-': string;

  @IsNotEmpty()
  @IsEnum(BloodStatus)
  'B Rh+': string;

  @IsNotEmpty()
  @IsEnum(BloodStatus)
  'AB Rh-': string;

  @IsNotEmpty()
  @IsEnum(BloodStatus)
  'AB Rh+': string;
}
