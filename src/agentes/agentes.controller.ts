import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { AgentesService } from './agentes.service';
import { Request, Response } from 'express';
import { OpenAIService } from 'src/services/openai.service';
import Whatsapp from 'whatsapp-web.js';
import { WhatsappService } from 'src/services/whatsapp.service';
import { ProductsService } from 'src/products/products.service';
import { ChatCompletionMessageParam } from 'openai/resources/index';

const system_prompt = `
  # Persona
    Você é um vendedor de jogos de ps5 e pc, expecialista em FORTNITE, CALL OF DUTY, VALORANT e GTA V.
    Você é simpático, prestativo, comunicativo e atencioso.
  # Diretives
      ## Informações sobre a empresa
      A empresa se chama GameStore, especializada na venda de jogos digitais para PS5 e PC, 
      Oferecemos uma ampla variedade de títulos, desde os mais populares até os lançamentos mais recentes, 
      Nosso objetivo é proporcionar aos nossos clientes a melhor experiência de compra possível, com atendimento personalizado e suporte dedicado,
      Fundado por Breno Freguglia.

  # Saida
    Use frases curtas e objetivas com maximo de 100 caracteres. 
    Responda sempre de forma amigável e prestativa.
    Use emojis apenas quanfo fizer sentido a frase.

`;

@Controller('agentes')
export class AgentesController {
  constructor(
    private readonly agentes: AgentesService,
    private readonly openAI: OpenAIService,
    private readonly wpp: WhatsappService,
    private readonly products: ProductsService,
  ) {
    this.wpp.inscreverEvento(
      Whatsapp.Events.MESSAGE_CREATE,
      this.mensagemWhatsapp.bind(this),
    );
  }

  async mensagemWhatsapp(msg) {
    if (msg.fromMe === true) {
      return;
    }

    if (!msg.body.startsWith('!')) {
      return;
    }

    const mensagens: ChatCompletionMessageParam[] = [
      {
        role: 'system',
        content: system_prompt,
      },
      { role: 'user', content: msg.body },
    ];

    const agente_resposta = await this.openAI.client.chat.completions.create({
      model: 'gpt-4o-mini',
      temperature: 0.6,
      messages: mensagens,
      tools: [
        {
          type: 'function',
          function: {
            name: 'listar_produtos',
            description: 'Busque os produtos disponiveis na loja',
          },
        },
      ],
      tool_choice: 'auto',
    });

    const ferramentas = agente_resposta.choices[0].message.tool_calls;

    if (ferramentas?.length) {
      mensagens.push({
        role: 'assistant',
        tool_calls: ferramentas,
        content: '',
      });

      const ferramenta = ferramentas[0];
      if (ferramenta.type == 'function') {
        if (ferramenta.function.name === 'listar_produtos') {
          const produtos = this.products.listaProdutos();
          mensagens.push({
            role: 'tool',
            tool_call_id: ferramenta.id,
            content: JSON.stringify(produtos),
          });
        }
      }
    }

    const resposta_final = await this.openAI.client.chat.completions.create({
      model: 'gpt-4o-mini',
      temperature: 0.6,
      messages: mensagens,
      tools: [
        {
          type: 'function',
          function: {
            name: 'listar_produtos',
            description: 'Busque os produtos disponiveis na loja',
          },
        },
      ],
      tool_choice: 'auto',
    });

    const resposta = resposta_final.choices[0].message.content;

    msg.reply(resposta);
  }

  @Post('msg')
  async sendMensagem(@Req() req: Request, @Res() res: Response, @Body() body) {
    const agente_resposta = await this.openAI.client.chat.completions.create({
      model: 'gpt-4o-mini',
      temperature: 0.6,
      messages: [
        {
          role: 'system',
          content: system_prompt,
        },
        { role: 'user', content: body.mensagem },
      ],
    });
    const resposta = agente_resposta.choices[0].message.content;

    return res.json({ mensagem: resposta });
  }
}
