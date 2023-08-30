import { Controller, Get, Res } from '@nestjs/common'
import { Response } from 'express'
import * as path from 'path'
import * as fs from 'fs-extra'

@Controller('download')
export class CsvDownloadController {
  @Get('csv')
  async downloadCsv(@Res() res: Response) {
    const filesDirectory = path.join(__dirname, '..', '..', './files')

    const files = await fs.readdir(filesDirectory);
    files.sort((a, b) => {
      const aStats = fs.statSync(path.join(filesDirectory, a))
      const bStats = fs.statSync(path.join(filesDirectory, b))
      return aStats.mtime.getTime() - bStats.mtime.getTime()
    });

    // 最終的にアップしたファイルを取得
    const latestFileName = files[files.length - 1]

    const filePath = path.join(filesDirectory, latestFileName)

    if (!fs.existsSync(filePath)) {
      res.status(404).send('CSV file not found')
      return;
    }

    res.setHeader('Content-Type', 'text/csv')
    res.setHeader('Content-Disposition', `attachment; filename="${latestFileName}"`)

    fs.createReadStream(filePath).pipe(res)
  }
}