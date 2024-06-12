import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '../auth/auth.guard';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiParam } from '@nestjs/swagger';

@ApiTags('users') // Adiciona a tag 'users'
@ApiBearerAuth() // Adiciona a autenticação JWT
@UseGuards(AuthGuard) // Aplica o guardião JWT
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':username')
  @ApiOperation({ summary: 'Get user by username' })
  @ApiParam({ name: 'username', description: 'Username of the user' })
  findOne(@Param('username') username: string) {
    return this.usersService.findOne(username);
  }
}
