import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Badge } from '../entities/badge.entity';
import { UserBadge } from '../entities/userbadge.entity';
import { BadgesService } from './badges.service';
import { BadgesController } from './badges.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([Badge, UserBadge]),
    JwtModule.register({
      secret: 'SECRET_KEY', // Use uma chave secreta segura
      signOptions: { expiresIn: '60m' },
    }),
  ],
  providers: [BadgesService],
  controllers: [BadgesController],
})
export class BadgesModule {}
