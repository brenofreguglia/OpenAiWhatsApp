import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { AgentesService } from './agentes.service';
import { Request, Response } from 'express';
import { OpenAIService } from 'src/services/openai.service';

interface Mensagem {
  to: string;
  body: string;
}

@Controller('agentes')
export class AgentesController {
  constructor(
    private readonly agentes: AgentesService,
    private readonly openAI: OpenAIService,
  ) {}

  @Post('msg')
  async sendMensagem(@Req() req: Request, @Res() res: Response, @Body() body) {
   const agente_resposta = await this.openAI.client.chat.completions.create({
      model: 'gpt-4o-mini',
      temperature: 0.6,
      messages: [
        {
          role: 'system',
          content: 'Você é um assistente do curso de IA no whatsApp',
        },
        { role: 'user', content: body.mensagem },
      ],
    });
    const resposta = agente_resposta.choices[0].message.content;

    return res.json({ mensagem: resposta });
  }
}
