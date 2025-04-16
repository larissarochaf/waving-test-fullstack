import { Body, Controller, Get, Post } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Controller('orders')
export class OrdersController {
  constructor(private prisma: PrismaService) {}

  @Get()
  async getAllOrders() {
    const orders = await this.prisma.order.findMany({
      include: {
        cart: {
          include: {
            items: {
              include: {
                product: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return orders.map((order) => ({
      id: order.id,
      createdAt: order.createdAt,
      total: order.total,
      status: order.status,
      products: order.cart?.items.map((item) => ({
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
      })) || [],
    }));
  }

  @Post()
  async createOrder(
    @Body()
    body: {
      items: { productId: string; quantity: number }[];
      total: number;
      userId: string;
    }
  ) {
    const cart = await this.prisma.cart.create({
      data: {
        userId: body.userId,
        items: {
          create: body.items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
          })),
        },
      },
    });

    const order = await this.prisma.order.create({
      data: {
        cartId: cart.id,
        userId: body.userId,
        total: body.total,
        status: 'PENDING',
      },
    });

    return { success: true, orderId: order.id };
  }
}
