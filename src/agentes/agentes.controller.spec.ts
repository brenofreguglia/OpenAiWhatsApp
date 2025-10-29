import { Test, TestingModule } from '@nestjs/testing';
import { AgentesController } from './agentes.controller';
import { AgentesService } from './agentes.service';

describe('AgentesController', () => {
  let controller: AgentesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AgentesController],
      providers: [AgentesService],
    }).compile();

    controller = module.get<AgentesController>(AgentesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
