import { Module } from '@nestjs/common';
import { GuserService } from './guser.service';
import { GuserController } from './guser.controller';
import { PrismaService } from './prisma.service';

@Module({
  controllers: [GuserController],
  providers: [GuserService, PrismaService],
})
export class GuserModule {}
