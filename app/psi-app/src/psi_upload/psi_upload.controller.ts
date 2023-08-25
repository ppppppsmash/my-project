
import { Multer } from 'multer'
import { Controller, Post, UploadedFile, UseInterceptors, BadRequestException } from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import * as csvParser from 'csv-parser'
import * as fs from 'fs-extra'

@Controller('upload')
export class PsiUploadController {
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
