import { Test, TestingModule } from '@nestjs/testing';
import { BrowserResolver } from './browser.resolver';

describe('BrowserResolver', () => {
  let resolver: BrowserResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BrowserResolver],
    }).compile();

    resolver = module.get<BrowserResolver>(BrowserResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
