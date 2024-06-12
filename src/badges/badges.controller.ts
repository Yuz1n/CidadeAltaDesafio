import { Controller, Get, Post, Req, UseGuards, Body, Query, Param } from '@nestjs/common';
import { BadgesService } from './badges.service';
import { AuthGuard } from '../auth/auth.guard';
import { RedeemBadgeDto } from './dto/redeem-badge.dto';
import { PaginationQueryDto } from './dto/pagination-query.dto';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiQuery, ApiParam, ApiResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('badges')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('badges')
export class BadgesController {
  constructor(private readonly badgesService: BadgesService) {}

  @Get('all')
  @ApiOperation({ summary: 'List all badges' })
  @ApiResponse({
    status: 200,
    description: 'List of all badges',
    schema: {
      example: [
        {
          id: 1,
          slug: 'cda',
          name: 'Cidade Alta',
          image: 'https://cidadealtarp.com/imagens/challenge/cidade-alta.png',
        },
      ],
    },
  })
  findAll() {
    return this.badgesService.findAll(1, 100);
  }

  @Get('paginated')
  @ApiOperation({ summary: 'List badges with pagination' })
  @ApiQuery({ name: 'page', required: true, description: 'Page number' })
  @ApiQuery({ name: 'limit', required: true, description: 'Number of items per page' })
  @ApiResponse({
    status: 200,
    description: 'Paginated list of badges',
    schema: {
      example: [
        {
          id: 1,
          slug: 'cda',
          name: 'Cidade Alta',
          image: 'https://cidadealtarp.com/imagens/challenge/cidade-alta.png',
        },
      ],
    },
  })
  findPaginated(@Query('page') page: number, @Query('limit') limit: number) {
    return this.badgesService.findAll(page, limit);
  }

  @Get('filter')
  @ApiOperation({ summary: 'List badges by name' })
  @ApiQuery({ name: 'name', required: true, description: 'Filter by badge name' })
  @ApiResponse({
    status: 200,
    description: 'List of badges filtered by name',
    schema: {
      example: [
        {
          id: 7,
          slug: 'coruja',
          name: 'Coruja',
          image: 'https://cidadealtarp.com/imagens/challenge/coruja.png',
        },
      ],
    },
  })
  findByName(@Query('name') name: string) {
    return this.badgesService.findAll(1, 100, name);
  }

  @Get('filter-paginated')
  @ApiOperation({ summary: 'List badges by name with pagination' })
  @ApiQuery({ name: 'page', required: true, description: 'Page number' })
  @ApiQuery({ name: 'limit', required: true, description: 'Number of items per page' })
  @ApiQuery({ name: 'name', required: true, description: 'Filter by badge name' })
  @ApiResponse({
    status: 200,
    description: 'Paginated list of badges filtered by name',
    schema: {
      example: [
        {
          id: 7,
          slug: 'coruja',
          name: 'Coruja',
          image: 'https://cidadealtarp.com/imagens/challenge/coruja.png',
        },
      ],
    },
  })
  findByNamePaginated(@Query('page') page: number, @Query('limit') limit: number, @Query('name') name: string) {
    return this.badgesService.findAll(page, limit, name);
  }

  @Post('redeem')
  @ApiOperation({ summary: 'Redeem a badge' })
  @ApiBody({
    description: 'Badge slug to redeem',
    schema: {
      example: { slug: 'cda' },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Badge redeemed successfully',
    schema: {
      example: { message: 'Badge redeemed successfully' },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Badge already redeemed or not found',
    schema: {
      example: { message: 'Badge already redeemed. Please try to redeem another badge.' },
    },
  })
  async redeemBadge(@Body() redeemBadgeDto: RedeemBadgeDto, @Req() req) {
    return this.badgesService.redeemBadge(req.user.id, redeemBadgeDto.slug);
  }

  @Get('redeemed')
  @ApiOperation({ summary: 'List all badges redeemed by the current user' })
  @ApiResponse({
    status: 200,
    description: 'List of badges redeemed by the current user',
    schema: {
      example: [
        {
          id: 1,
          slug: 'cda',
          name: 'Cidade Alta',
          image: 'https://cidadealtarp.com/imagens/challenge/cidade-alta.png',
          redeemedAt: '2024-06-11T01:54:57.813Z',
        },
      ],
    },
  })
  findRedeemedBadges(@Req() req) {
    return this.badgesService.findRedeemedBadges(req.user.id);
  }

  @Get('redeemed/:userId')
  @ApiOperation({ summary: 'List all badges redeemed by a specific user' })
  @ApiParam({ name: 'userId', description: 'ID of the user' })
  @ApiResponse({
    status: 200,
    description: 'List of badges redeemed by a specific user',
    schema: {
      example: [
        {
          id: 1,
          slug: 'cda',
          name: 'Cidade Alta',
          image: 'https://cidadealtarp.com/imagens/challenge/cidade-alta.png',
          redeemedAt: '2024-06-11T01:54:57.813Z',
        },
      ],
    },
  })
  findAllRedeemedByUser(@Param('userId') userId: number) {
    return this.badgesService.findAllRedeemedByUser(userId);
  }
}
