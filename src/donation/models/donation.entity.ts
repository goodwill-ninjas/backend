import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from '../../user/models/user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IsOptional } from 'class-validator';

@Entity('donation')
export class DonationEntity {
  @ApiProperty({
    description: 'ID of the donation',
    example: 1,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'ID of user adding the donation',
    example: 1,
  })
  @Column({ nullable: true })
  user_id: number;

  @ManyToOne(() => UserEntity, user => user.donations, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'user_id' })
  @Exclude()
  user: UserEntity;

  @ApiProperty({
    description: 'Whether the user was disqualified',
    example: false,
  })
  @Column()
  disqualified: boolean;

  @ApiProperty({
    description: 'Number of days for the disqualification period',
    example: 14,
  })
  @IsOptional()
  @Column({ nullable: true })
  disqualification_days: number;

  @ApiProperty({
    description: 'ID of user accompanying the requester',
    nullable: true,
  })
  @IsOptional()
  @Column({ nullable: true })
  companion_user_id: number;

  @OneToOne(() => UserEntity, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @IsOptional()
  @JoinColumn({ name: 'companion_user_id' })
  companion_user: UserEntity;

  @ApiProperty({
    description: 'Type of Blood Donation',
    example: 'whole',
    nullable: true,
  })
  @Column({ nullable: true })
  donated_type: string;

  @ApiProperty({
    description: 'Amount of blood donated in milliliters',
    example: 450,
    nullable: true,
  })
  @Column({ nullable: true })
  amount: number;

  @ApiProperty({
    description: 'Systolic and diastolic pressure at the time of donation',
    example: '170/90',
    nullable: true,
  })
  @Column({ nullable: true })
  blood_pressure: string;

  @ApiProperty({
    description: 'Hemoglobin levels in g/l',
    nullable: true,
  })
  @IsOptional()
  @Column({ nullable: true })
  hemoglobin: number;

  @ApiProperty({
    description:
      'User comments about the donation or reasons for disqualification',
    example: 'Nurse warned me about low hemoglobin levels.',
    nullable: true,
  })
  @Column({ nullable: true })
  details: string;

  @ApiProperty({
    description: 'Which arm was used during donation',
    example: 'left',
    nullable: true,
  })
  @Column({ nullable: true })
  arm: string;

  @ApiProperty({
    description: 'Time of the donation',
    example: '2002-02-02T22:22:22.22Z',
  })
  @Column({ type: 'timestamp with time zone' })
  donated_at: Date;

  @ApiProperty({
    description: 'Time of donation creation',
    example: '2002-02-02T22:22:22.22Z',
  })
  @CreateDateColumn()
  created_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
