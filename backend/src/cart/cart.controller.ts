import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('cart')
@Controller('cart')
export class CartController {
  @Get()
  @ApiOperation({ summary: 'Listar todos os carrinhos' })
  findAll() {
    return 'Lista de carrinhos (placeholder)';
  }
}
