import { ApiProperty, PartialType } from '@nestjs/swagger'
import { IsBoolean, IsString } from 'class-validator'
import { CreateAuctionDto } from './create-auction.dto'

// TODO: Make this have more fields
export class UpdateAuctionDto extends PartialType(CreateAuctionDto) {}
