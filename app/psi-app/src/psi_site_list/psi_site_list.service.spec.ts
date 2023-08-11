import { Test, TestingModule } from '@nestjs/testing';
import { PsiSiteListService } from './psi_site_list.service';

describe('PsiSiteListService', () => {
  let service: PsiSiteListService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PsiSiteListService],
    }).compile();

    service = module.get<PsiSiteListService>(PsiSiteListService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
