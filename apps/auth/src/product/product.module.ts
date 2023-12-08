import { DatabaseModule } from "@app/common";
import { Module } from "@nestjs/common";
import { ProductController } from "./product.controller";
import { ProductService } from "./product.service";
import { PrismaService } from "@app/common/database/prisma.service";

@Module({
    imports: [DatabaseModule],
    controllers: [ ProductController],
    providers: [ProductService, PrismaService]

})
export class ProductModule {

}