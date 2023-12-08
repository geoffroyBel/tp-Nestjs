import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { DatabaseModule } from '@app/common';
import { PrismaService } from '@app/common/database/prisma.service';

@Module({
  exports:[UsersService],
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers: [UsersService, PrismaService]
})
export class UsersModule {}
