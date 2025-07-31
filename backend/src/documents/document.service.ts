import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { S3Service } from 'src/s3/s3.service';

@Injectable()
export class DocumentsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly s3: S3Service
  ) {}

    async create(data: { image: Express.Multer.File; userId: string }) {
        let documentUrl: string | undefined;

        if (data.image) {
            documentUrl = await this.s3.uploadFile(data.image);
        }

        return this.prisma.document.create({
            data: {
                userId: data.userId,
                documentUrl
            },
        });
    }

    async findAllByUser(userId: string) {
        return this.prisma.document.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
        });
    }

    async findOne(id: string, userId: string) {
        const doc = await this.prisma.document.findFirst({
        where: { id, userId },
        });
        if (!doc) {
        throw new NotFoundException('Documento não encontrado');
        }
        return doc;
    }

}
