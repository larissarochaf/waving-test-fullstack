import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ProductsModule } from './products/products.module';
import { CartModule } from './cart/cart.module';
import { OrderModule } from './order/order.module';
import { CartItemModule } from './cart/cart-item.module';
import { AdminController } from './admin/admin.controller';
import { AuthController } from './auth/auth.controller';

@Module({
  imports: [
    ProductsModule,
    CartModule,
    OrderModule,
    CartItemModule,
  ],
  controllers: [AppController, AdminController, AuthController],
  providers: [AppService],
})
export class AppModule {}
