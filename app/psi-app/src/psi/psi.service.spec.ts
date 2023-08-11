import { Test, TestingModule } from '@nestjs/testing';
import { PsiService } from './psi.service';

describe('PsiService', () => {
  let service: PsiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PsiService],
    }).compile();

    service = module.get<PsiService>(PsiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
