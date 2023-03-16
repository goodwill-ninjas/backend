import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('image')
export class ImageEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  alt_text: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}
