import { Controller, Get, Res, Param } from '@nestjs/common'
import { Response } from 'express'
import * as path from 'path'
import * as fs from 'fs-extra'

@Controller('download')
export class CsvDownloadController {
  // selectからcsvファイル一覧
  @Get('csv-list')
  async getCsvList(@Res() res: Response) {
    const filesDirectory = path.join(__dirname, '..', '..', './files')

    const files = await fs.readdir(filesDirectory)
    files.sort((a, b) => {
      const aStats = fs.statSync(path.join(filesDirectory, a))
      const bStats = fs.statSync(path.join(filesDirectory, b))
      return aStats.mtime.getTime() - bStats.mtime.getTime()
    })

    res.send(files)
  }

  // selectで選択したファイルをダウンロード
  @Get('csv/:filename')
  async downloadCsv(@Res() res: Response, @Param('filename') filename: string) {
    const filesDirectory = path.join(__dirname, '..', '..', './files')
    const filePath = path.join(filesDirectory, filename)

    if (!fs.existsSync(filePath)) {
      res.status(404).send('CSV file not found')
      return
    }

    res.setHeader('Content-Type', 'text/csv')
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`)

    fs.createReadStream(filePath).pipe(res)
  }
}