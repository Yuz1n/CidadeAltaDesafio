import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BadgesModule } from './badges/badges.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { User } from './entities/user.entity';
import { Badge } from './entities/badge.entity';
import { UserBadge } from './entities/userbadge.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '123456', // Substitua pela senha correta do MySQL
      database: 'badge_system',
      entities: [User, Badge, UserBadge],
      synchronize: true,
    }),
    BadgesModule,
    AuthModule,
    UsersModule,
  ],
})
export class AppModule {}
