import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Badge } from './badge.entity';
import { User } from './user.entity';

@Entity()
export class UserBadge {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.id)
  user: User;

  @ManyToOne(() => Badge, badge => badge.id)
  badge: Badge;

  @Column()
  redeemedAt: Date;
}
