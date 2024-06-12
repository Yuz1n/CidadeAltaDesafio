import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RedeemBadgeDto {
  @ApiProperty({ description: 'Slug of the badge to be redeemed' })
  @IsString()
  @IsNotEmpty()
  slug: string;
}
