import { PrismaService } from '@app/common/database/prisma.service';
import { Injectable } from '@nestjs/common';
import { Product, User } from '@prisma/client';
import { log } from 'console';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async getAllProduts(): Promise<Product[]> {
    return this.prisma.product.findMany();
  }

  async getProduct(id: number): Promise<Product | null> {
    return this.prisma.product.findUnique({
      where: {
        id: Number(id),
      },
    });
  }

  async createProduct(data: Product, user: User): Promise<Product> {
    return this.prisma.product.create({
      data: {
        ...data,
        authorId: user.id,
      },
    });
  }
  async updateProduct(id: number, data: Product): Promise<Product> {
    return this.prisma.product.update({ where: { id: Number(id) }, data });
  }

  async delete(id: number): Promise<void> {
    await this.prisma.product.delete({ where: { id } });
  }
}
