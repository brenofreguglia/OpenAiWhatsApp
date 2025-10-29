import { Test, TestingModule } from '@nestjs/testing';
import { AgentesService } from './agentes.service';

describe('AgentesService', () => {
  let service: AgentesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AgentesService],
    }).compile();

    service = module.get<AgentesService>(AgentesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
