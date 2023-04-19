import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('image')
export class ImageEntity {
  @ApiProperty({
    description: 'ID of the donation',
    example: 1,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'Type of the image',
    example: 'medal',
  })
  @Column()
  type: string;

  @ApiProperty({
    description: 'Name of the image',
    example: 'lvl_5',
  })
  @Column()
  name: string;

  @ApiProperty({
    description: 'Alternative text describing the image',
    example: 'Medal received for reaching level 5',
  })
  @Column({ nullable: true })
  alt_text: string;

  @ApiProperty({
    description: 'Time of image creation',
    example: '2002-02-02T22:22:22.22Z',
  })
  @CreateDateColumn()
  created_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
