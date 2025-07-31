import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

import { S3Service } from 'src/s3/s3.service';
import { DocumentsController } from './document.controller';
import { DocumentsService } from './document.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  controllers: [DocumentsController],
  providers: [DocumentsService, PrismaService, S3Service],
})
export class DocumentsModule {}