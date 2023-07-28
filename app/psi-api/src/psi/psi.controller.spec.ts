import { Test, TestingModule } from '@nestjs/testing';
import { PsiController } from './psi.controller';

describe('PsiController', () => {
  let controller: PsiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PsiController],
    }).compile();

    controller = module.get<PsiController>(PsiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
