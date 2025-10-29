import { Module } from '@nestjs/common';
import { AgentesService } from './agentes.service';
import { AgentesController } from './agentes.controller';
import { OpenAIService } from 'src/services/openai.service';

@Module({
  controllers: [AgentesController],
  providers: [AgentesService, OpenAIService],
})
export class AgentesModule {}
