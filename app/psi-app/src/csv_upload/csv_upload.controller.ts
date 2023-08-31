
import { Multer } from 'multer'
import { Controller, Post, Get, Param, Res, UploadedFile, UseInterceptors, BadRequestException } from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import * as csvParser from 'csv-parser'
import * as fs from 'fs-extra'
import axios from 'axios'
import { Response } from 'express'

@Controller('upload')
export class CsvUploadController {
  @Post()
  @UseInterceptors(FileInterceptor('csvFile', { dest: './files' }))
  async uploadFile(@UploadedFile() file: Multer.File) {
    if (!file) {
      throw new BadRequestException('CSVファイルが指定されていません。')
    }
    const results = []
    return new Promise((resolve, reject) => {
      const stream = fs.createReadStream(file.path)
      stream
        .pipe(csvParser())
        .on('data', (data) => {
          const filteredData = Object.fromEntries(Object.entries(data).filter(([key, value]) => key !== ''))
          results.push(filteredData)
          console.log(results)
        })
        .on('end', () => resolve(results))
        .on('error', (error) => reject(error))
    })
  }
}

@Controller('download')
// export class PsiDownloadController {
//   @Get(':filename')
//   async downloadFile(@Param('filename') filename: string, @Res() res: Response) {
//     const filePath = `./files/${filename}`
//     res.download(filePath)
//   }
// }
export class PsiDownloadController {
  @Get(':filename')
  async downloadFile(@Param('filename') filename: string, @Res() res: Response) {
    try {
      const fileStream = fs.createReadStream(`./files/${filename}`); // アップロードされたファイルのパス
      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', `attachment; filename="${filename}"`); // ダウンロード時のファイル名を指定
      fileStream.pipe(res);
    } catch (error) {
      console.error('CSVファイルのダウンロードエラー:', error);
      res.status(500).send('CSVファイルのダウンロード中にエラーが発生しました。');
    }
  }
}
