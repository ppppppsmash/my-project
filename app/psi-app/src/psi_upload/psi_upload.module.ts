import { Module } from '@nestjs/common';
import { PsiUploadController } from './psi_upload.controller';
import { PsiUploadService } from './psi_upload.service';

@Module({
  controllers: [PsiUploadController],
  providers: [PsiUploadService]
})
export class PsiUploadModule {}
