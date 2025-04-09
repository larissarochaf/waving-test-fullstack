import { Injectable, NotFoundException  } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  create(createProductDto: CreateProductDto) {
    return this.prisma.product.create({
      data: {
        ...createProductDto,
        description: createProductDto.description ?? '',
      },
    });
  }

  findAll() {
    return this.prisma.product.findMany();
  }

  async findOne(id: string) {
    const product = await this.prisma.product.findUnique({ where: { id } });
    if (!product) throw new NotFoundException('Produto não encontrado');
    return product;
  }
  
  async update(id: string, updateProductDto: UpdateProductDto) {
    await this.findOne(id); //garantir que o produto existe é bom
    return this.prisma.product.update({
      where: { id },
      data: updateProductDto,
    });
  }
  
  async remove(id: string) {
    await this.findOne(id); // garantia nunca é demais
    return this.prisma.product.delete({
      where: { id },
    });
  }
}
