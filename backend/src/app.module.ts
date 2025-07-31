import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma/prisma.service';
import { DocumentsModule } from './documents/document.module';

@Module({
  imports: [AuthModule, DocumentsModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
