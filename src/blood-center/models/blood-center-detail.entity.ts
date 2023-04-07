import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { BloodCenterEntity } from './blood-center.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('blood_center_detail')
export class BloodCenterDetailEntity {
  @ApiProperty({
    description: 'Primary key as Blood Center Detail ID',
    example: 1,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'ID of the connected Blood Center',
    example: 2,
  })
  @ManyToOne(() => BloodCenterEntity, center => center.blood_center_details, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'blood_center_id' })
  blood_center: BloodCenterEntity;

  @ApiProperty({
    description: 'Blood Type in Blood Center Detail record',
    example: 'AB-',
  })
  @Column()
  blood_type: string;

  @ApiProperty({
    description: 'Capacity of the blood type record',
    example: 'MODERATE',
  })
  @Column()
  capacity: string;

  @ApiProperty({
    description: 'Timestamp provided by the scraper',
    example: '2002-02-02T22:22:22.22Z',
  })
  @Column()
  source_datetime: Date;

  @ApiProperty({
    description: 'Time of Blood Center Detail update',
    example: '2002-02-02T22:22:22.22Z',
  })
  @UpdateDateColumn()
  updated_at: Date;

  @ApiProperty({
    description: 'Time of Blood Center Detail creation',
    example: '2002-02-02T22:22:22.22Z',
  })
  @CreateDateColumn()
  created_at: Date;
}
