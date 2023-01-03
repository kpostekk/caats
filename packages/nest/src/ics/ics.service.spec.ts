import { Test, TestingModule } from '@nestjs/testing';
import { IcsService } from './ics.service';

describe('IcsService', () => {
  let service: IcsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IcsService],
    }).compile();

    service = module.get<IcsService>(IcsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
