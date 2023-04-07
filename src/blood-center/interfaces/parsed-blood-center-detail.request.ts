import { BloodType } from '../../common/enum/blood-type.enum';
import { BloodStatus } from '../../common/enum/blood-status.enum';

export interface ParsedBloodCenterDetailRequest {
  city: string;
  bloodType: BloodType;
  capacity: BloodStatus;
  source_datetime: Date;
}
