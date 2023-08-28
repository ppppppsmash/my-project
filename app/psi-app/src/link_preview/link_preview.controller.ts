import { Controller, Get, Query } from '@nestjs/common'
import { LinkPreviewService } from './link_preview.service'

@Controller('link_preview')
export class LinkPreviewController {
  constructor(private readonly linkPreviewService: LinkPreviewService) {}

  @Get()
  // async getLinkPreview(@Query() params: { q: string }) {
  async getLinkPreview(@Query('url') url: string ) {
    return this.linkPreviewService.linkPreview(url)
  }
}
