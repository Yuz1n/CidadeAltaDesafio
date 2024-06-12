import { Test, TestingModule } from '@nestjs/testing';
import { BadgesService } from './badges.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Badge } from '../entities/badge.entity';
import { UserBadge } from '../entities/userbadge.entity';
import { Repository } from 'typeorm';

describe('BadgesService', () => {
  let service: BadgesService;
  let badgeRepository: Repository<Badge>;
  let userBadgeRepository: Repository<UserBadge>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BadgesService,
        {
          provide: getRepositoryToken(Badge),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(UserBadge),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<BadgesService>(BadgesService);
    badgeRepository = module.get<Repository<Badge>>(getRepositoryToken(Badge));
    userBadgeRepository = module.get<Repository<UserBadge>>(getRepositoryToken(UserBadge));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // Adicione mais testes aqui
});
