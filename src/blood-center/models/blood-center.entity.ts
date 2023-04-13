import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BloodCenterDetailEntity as BloodCenterDetails } from './blood-center-detail.entity';
import { BloodCenterEventEntity as BloodCenterEvent } from './blood-center-event.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('blood_center')
export class BloodCenterEntity {
  @ApiProperty({
    description: 'Primary key as Blood Center ID',
    example: 1,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'Name of the Blood Center',
    example: 'RCKiK w Gdańsku',
  })
  @Column()
  name: string;

  @ApiProperty({
    description: 'Blood Center address - street name',
    example: 'J. Hoene-Wrońskiego',
  })
  @Column()
  street_name: string;

  @ApiProperty({
    description: 'Blood Center address - street number',
    example: '4',
  })
  @Column()
  street_number: string;

  @ApiProperty({
    description: 'Blood Center address - postal code',
    example: '80-210',
  })
  @Column()
  postal_code: string;

  @ApiProperty({
    description: 'Blood Center address - city',
    example: 'Gdańsk',
  })
  @Column()
  city: string;

  @ApiProperty({
    description: 'Blood Center address - voivodeship',
    example: 'Pomorskie',
  })
  @Column()
  voivodeship: string;

  @ApiProperty({
    description: 'Blood Center address - geographic coordinates',
    example: '54.36571840625166, 18.62905187316372',
  })
  @Column({ unique: true })
  geo_coordinates: string;

  @ApiProperty({
    description: 'Blood Center building phone number',
    example: '123 456 789',
  })
  @Column()
  phone_number: string;

  @ApiProperty({
    description: 'Blood Center building opening hours',
    example: '07:00:00',
  })
  @Column({ type: 'time with time zone', nullable: true })
  open_from: Date;

  @ApiProperty({
    description: 'Blood Center building closing hours',
    example: '14:00:00',
  })
  @Column({ type: 'time with time zone', nullable: true })
  open_to: Date;

  @OneToMany(() => BloodCenterEntity, center => center.id)
  blood_banks: BloodCenterEntity[];

  @ApiProperty({
    description: 'Blood Center Details - Blood Capacity',
    example: BloodCenterDetails,
    isArray: true,
  })
  @OneToMany(() => BloodCenterDetails, details => details.blood_center)
  blood_center_details: BloodCenterDetails[];

  @OneToMany(() => BloodCenterEvent, event => event.blood_center)
  events: BloodCenterEvent[];

  @ApiProperty({
    description: 'Time of Blood Center creation',
    example: '2002-02-02T22:22:22.22Z',
  })
  @CreateDateColumn()
  created_at: Date;
}
