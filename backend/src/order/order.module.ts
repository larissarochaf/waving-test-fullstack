import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrdersController } from './order.controller';


@Module({
  providers: [OrderService],
  controllers: [OrdersController]
})
export class OrderModule {}
