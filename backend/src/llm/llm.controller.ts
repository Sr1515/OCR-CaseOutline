import {
  Controller,
  Post,
  Param,
  Req,
  UseGuards,
  HttpCode,
  HttpStatus,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { LlmService } from './llm.service';
import { DocumentsService } from '../documents/document.service';
import { AuthGuard } from 'src/auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('llm')
export class LlmController {
  constructor(
    private readonly llmService: LlmService,
    private readonly documentsService: DocumentsService,
  ) {}

  @Post(':documentId')
  @HttpCode(HttpStatus.CREATED)
  async askQuestion(
    @Param('documentId') documentId: string,
    @Req() req: any,
  ) {
    // extrai userId da requisição (setado pelo AuthGuard)
    const userId = req.user?.id;
    if (!userId) {
      throw new UnauthorizedException('Usuário não autenticado');
    }

    // extrai question do corpo multipart - pode estar em req.body.question
    const question = req.body?.question;
    if (!question) {
      throw new NotFoundException('Pergunta não fornecida');
    }

    // busca documento com userId para garantir autorização
    const doc = await this.documentsService.findOne(documentId, userId);
    if (!doc || !doc.text) {
      throw new NotFoundException('Documento ou texto não encontrado');
    }

    // chama LLM para explicar o texto baseado na pergunta
    const answer = await this.llmService.explainText(doc.text, question);

    // registra interação no banco
    const interaction = await this.llmService.createInteraction(
      documentId,
      question,
      answer,
    );

    return {
      question,
      answer,
      interactionId: interaction.id,
    };
  }
}
