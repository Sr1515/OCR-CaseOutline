import { HttpException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { S3Service } from 'src/s3/s3.service';
import { Document } from 'generated/prisma';
import { OcrService } from 'src/ocr/ocr.service';

@Injectable()
export class DocumentsService {
  private readonly logger = new Logger(DocumentsService.name)

  constructor(
    private readonly prisma: PrismaService,
    private readonly s3: S3Service,
    private readonly ocrService: OcrService,
  ) {}

    async create(data: { image: Express.Multer.File; userId: string }): Promise<Document | null> {
        try {
            let documentUrl: string | undefined;

            if (data.image) {
                documentUrl = await this.s3.uploadFile(data.image);
            }

            const ocrResult = await this.ocrService.runOcr(data.image.buffer);
            
            return await this.prisma.document.create({
                data: {
                    userId: data.userId,
                    documentUrl,
                    text: ocrResult.text
                },
            });

        } catch (error) {
            this.logger.error('Erro ao criar documento', error.stack);
            throw new InternalServerErrorException('Erro ao criar documento');
        }
        
        
    }

    async findAllByUser(userId: string): Promise<Document[] | null> {
        try {
            return this.prisma.document.findMany({
                where: { userId },
                orderBy: { createdAt: 'desc' },
        });
        } catch (error) {
            this.logger.error(`Erro ao buscar documentos do usuário ${userId}`, error.stack);
            throw new InternalServerErrorException('Erro ao buscar documentos');
        }  
    }

    async findOne(id: string, userId: string): Promise<Document> {
        try {
            const doc = await this.prisma.document.findFirst({
                where: { id, userId },
            });

            if (!doc) {
            throw new NotFoundException('Documento não encontrado');
            }

            return doc;

        } catch (error) {
            this.logger.error(`Erro ao buscar documento ${id} do usuário ${userId}`, error.stack);
            if (error instanceof NotFoundException) throw error;
            throw new InternalServerErrorException('Erro ao buscar documento');
        }
    }

    async download(id: string, userId: string) {

    }

    async delete(id: string): Promise<void> {
        try {
            const existingDocument = await this.prisma.document.findUnique({ where: { id } });

            if (!existingDocument) {
                throw new NotFoundException('Documento não encontrado');
            }

            if (existingDocument.documentUrl) {
                const key = existingDocument.documentUrl.split('/').pop();
                if (key) {
                    await this.s3.deleteFile(key);
                }
            }

            await this.prisma.document.delete({ where: { id } });

        } catch (error) {
            console.error('Error ao deletar documento:', error);

            if (error instanceof HttpException) {
                throw error;
            }

            throw new InternalServerErrorException('Error ao deletar documento');
        }
    }

}

