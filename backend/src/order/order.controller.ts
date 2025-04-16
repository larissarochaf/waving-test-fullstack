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
    userEmail: string;
  }
) {
  const user = await this.prisma.user.findUnique({
    where: { email: body.userEmail },
  });

  if (!user) {
    throw new Error('Usuário não encontrado');
  }

  const cart = await this.prisma.cart.create({
    data: {
      userId: user.id,
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
      userId: user.id,
      total: body.total,
      status: 'PENDING',
    },
  });

  return { success: true, orderId: order.id };
}

}
