import { Module } from '@nestjs/common'
import { LinkPreviewController } from './link_preview.controller'
import { LinkPreviewService } from './link_preview.service'

@Module({
  controllers: [LinkPreviewController],
  providers: [LinkPreviewService]
})
export class LinkPreviewModule {}
