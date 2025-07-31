import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  Req,
  Request,
  UploadedFile,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';

import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from 'src/auth/auth.guard';
import { DocumentsService } from './document.service';
import { OcrService } from 'src/ocr/ocr.service';

@Controller('documents')
export class DocumentsController {
  constructor(
    private readonly documentsService: DocumentsService,
    private readonly ocrService: OcrService

  ) {}

  @UseGuards(AuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async createPost(
    @UploadedFile() image: Express.Multer.File,
    @Request() req: any,
    ) {
        const result = await this.documentsService.create({
            image,
            userId: req.user.id,
        });

        const ocrResult = await this.ocrService.runOcr(image.buffer);

        return {
            message: 'Documento criado com sucesso',
            document: result,
            ocrText: ocrResult,
        };

    }

  @UseGuards(AuthGuard)
  @Get()
  async findAll(@Req() req: any) {
    const userId = req.user.id; 
    return this.documentsService.findAllByUser(userId);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string, @Req() req: any) {
    const userId = req.user?.id;
    return this.documentsService.findOne(id, userId);
  }
  
}
