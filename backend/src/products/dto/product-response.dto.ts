import { ApiProperty } from '@nestjs/swagger';

export class ProductResponseDto {
    @ApiProperty()
    id!: string;
  
    @ApiProperty()
    name!: string;
  
    @ApiProperty()
    description!: string;
  
    @ApiProperty()
    price!: number;
  
    @ApiProperty()
    imageUrl!: string;
  
    @ApiProperty()
    createdAt!: Date;
  
    @ApiProperty()
    updatedAt?: Date;
  }
  