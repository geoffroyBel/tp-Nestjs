import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { ProductService } from '../product/product.service';
@Injectable()
export class ProductGuard implements CanActivate {
  constructor(private readonly productService: ProductService) {}
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const productId = request.params.id;
    const userId = request.user.id;
    const isAdmin = request.user.admin;

    const product = await this.productService.getProduct(+productId);

    if (!product) {
      throw new NotFoundException('No reservation for that id');
    }

    if (product.authorId !== userId && !isAdmin) {
      throw new ForbiddenException('vous n etse pas autoriser');
    }

    return true;
  }
}
