import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { DonationEntity as Donation } from '../../donation/models/donation.entity';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column()
  blood_type: string;

  @Column()
  avatar: number;

  @Column()
  experience: number;

  @OneToMany(() => Donation, donation => donation.user_)
  donations: Donation[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}
