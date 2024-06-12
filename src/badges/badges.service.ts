import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Badge } from '../entities/badge.entity';
import { UserBadge } from '../entities/userbadge.entity';
import { User } from '../entities/user.entity';

@Injectable()
export class BadgesService {
  constructor(
    @InjectRepository(Badge)
    private badgesRepository: Repository<Badge>,
    @InjectRepository(UserBadge)
    private userBadgesRepository: Repository<UserBadge>,
  ) {}

  async findAll(page: number, limit: number, name?: string): Promise<Badge[]> {
    const query = this.badgesRepository.createQueryBuilder('badge');
    
    if (name) {
      console.log(`Filtering badges with name like: ${name}`);
      query.where('badge.name LIKE :name', { name: `%${name}%` });
    }

    query.skip((page - 1) * limit).take(limit);

    console.log(`Executing query with page: ${page}, limit: ${limit}`);
    const badges = await query.getMany();
    console.log('Badges found:', badges);
    return badges;
  }

  async redeemBadge(userId: number, slug: string): Promise<{ message: string }> {
    console.log('Redeeming badge for userId:', userId, 'and slug:', slug);
    const badge = await this.badgesRepository.findOne({ where: { slug } });
    if (!badge) {
      console.error('Badge not found');
      throw new Error('Badge not found');
    }

    const alreadyRedeemed = await this.userBadgesRepository.findOne({
      where: { user: { id: userId }, badge },
    });

    if (alreadyRedeemed) {
      console.error('Badge already redeemed');
      return { message: 'Badge already redeemed. Please try to redeem another badge.' };
    }

    const userBadge = new UserBadge();
    userBadge.user = { id: userId } as User;
    userBadge.badge = badge;
    userBadge.redeemedAt = new Date();

    console.log('Saving UserBadge:', userBadge);
    await this.userBadgesRepository.save(userBadge);
    console.log('UserBadge saved successfully');

    return { message: 'Badge redeemed successfully' };
  }

  findRedeemedBadges(userId: number): Promise<UserBadge[]> {
    return this.userBadgesRepository.find({
      where: { user: { id: userId } },
      relations: ['badge'],
    });
  }

  findAllRedeemedByUser(userId: number): Promise<UserBadge[]> {
    return this.userBadgesRepository.find({
      where: { user: { id: userId } },
      relations: ['badge'],
    });
  }
}
