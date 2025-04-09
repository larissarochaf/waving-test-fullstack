import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('cart-item')
@Controller('cart-item')
export class CartItemController {
  @Get()
  @ApiOperation({ summary: 'Listar todos os itens do carrinho' })
  findAll() {
    return 'Lista de itens do carrinho (placeholder)';
  }
}
