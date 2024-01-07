import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { Product, User } from '@prisma/client';
import { JwtAuthGuard } from '../guards/jwt-auth.guards';
import { AdminGuard } from '../guards/admin-auth.guards';
import { currentUser } from '../decorators/current-user.decorator';
import { ProductGuard } from '../guards/productOwnerGward';

@Controller('/products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getAllBook(): Promise<Product[]> {
    return this.productService.getAllProduts();
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(
    @Body() data: Product,
    @currentUser() user: User,
  ): Promise<Product | User> {
    return this.productService.createProduct(data, user);
  }

  @Delete('/:id')
  @UseGuards(JwtAuthGuard, ProductGuard)
  @HttpCode(204)
  async delete(
    @Param('id') id: string,
    @currentUser() user: User,
  ): Promise<void> {
    await this.productService.delete(+id);
  }

  @Patch('/:id')
  @UseGuards(JwtAuthGuard, ProductGuard)
  async update(
    @Param('id') id: string,
    @Body() data: Product,
  ): Promise<Product> {
    return this.productService.updateProduct(+id, data);
  }
}
