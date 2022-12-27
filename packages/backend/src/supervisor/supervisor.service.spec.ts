import { Test, TestingModule } from '@nestjs/testing';
import { SupervisorService } from './supervisor.service';

describe('SupervisorService', () => {
  let service: SupervisorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SupervisorService],
    }).compile();

    service = module.get<SupervisorService>(SupervisorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
