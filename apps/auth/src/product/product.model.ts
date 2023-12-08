import { Prisma } from "@prisma/client"

export class Product implements Prisma.ProductCreateInput {
    id: number;
    title: string;
    description?: string;
} 