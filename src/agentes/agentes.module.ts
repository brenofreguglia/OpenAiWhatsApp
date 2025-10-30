import { Module } from '@nestjs/common';
import { AgentesService } from './agentes.service';
import { AgentesController } from './agentes.controller';
import { OpenAIService } from 'src/services/openai.service';
import { WhatsappService } from 'src/services/whatsapp.service';
import { ProductsModule } from 'src/products/products.module';

@Module({
  imports: [ProductsModule],
  controllers: [AgentesController],
  providers: [AgentesService, OpenAIService, WhatsappService],
})
export class AgentesModule {}
