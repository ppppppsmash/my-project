import { Test, TestingModule } from '@nestjs/testing';
import { PsiSiteListController } from './psi_site_list.controller';

describe('PsiSiteListController', () => {
  let controller: PsiSiteListController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PsiSiteListController],
    }).compile();

    controller = module.get<PsiSiteListController>(PsiSiteListController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
