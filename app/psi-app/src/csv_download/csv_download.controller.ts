import { Controller, Get, Res, Param } from '@nestjs/common'
import { Response } from 'express'
import * as path from 'path'
import * as fs from 'fs-extra'

@Controller('download')
export class CsvDownloadController {
  // selectからcsvファイル一覧
  @Get('csv-list/:userId')
  async getCsvList(@Res() res: Response, @Param('userId') userId: string) {
    const filesDirectory = path.join(__dirname, '..', '..', './files', userId)

    const files = await fs.readdir(filesDirectory)
    files.sort((a, b) => {
      const aStats = fs.statSync(path.join(filesDirectory, a))
      const bStats = fs.statSync(path.join(filesDirectory, b))
      return bStats.mtime.getTime() - aStats.mtime.getTime()
    })

    res.send(files)
  }

  // selectで選択したファイルをダウンロード
  @Get('csv/:userId/:filename/')
  async downloadCsv(@Res() res: Response, @Param('filename') filename: string, @Param('userId') userId: string) {
    const filesDirectory = path.join(__dirname, '..', '..', './files', userId)
    console.log(filesDirectory)
    const filePath = path.join(filesDirectory, filename)
    console.log(filePath)

    if (!fs.existsSync(filePath)) {
      res.status(404).send('CSV file not found')
      return
    }

    res.setHeader('Content-Type', 'text/csv')
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`)

    fs.createReadStream(filePath).pipe(res)
  }
}