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
  HttpCode,
  HttpStatus,
} from '@nestjs/common';

import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from 'src/auth/auth.guard';
import { DocumentsService } from './document.service';

@Controller('documents')
export class DocumentsController {
  constructor(
    private readonly documentsService: DocumentsService,
  ) {}

  @UseGuards(AuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async createPost(
    @UploadedFile() image: Express.Multer.File,
    @Request() req: any,
    ) {
        return await this.documentsService.create({
            image,
            userId: req.user.id,
        });
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

  @UseGuards(AuthGuard)
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteById(@Param('id') id: string) {
    await this.documentsService.delete(id);
    return;
  }

  
}
