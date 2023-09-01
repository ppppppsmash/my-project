import { Multer } from 'multer'
import { Controller, Post, Get, Param, Res, UploadedFile, UseInterceptors, BadRequestException } from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import * as csvParser from 'csv-parser'
import * as path from 'path'
import * as fs from 'fs-extra'
import { format } from 'date-fns'

@Controller('upload')
export class CsvUploadController {
  @Post()
  @UseInterceptors(FileInterceptor('csvFile', { dest: './files' }))
  async uploadFile(@UploadedFile() file: Multer.File) {
    if (!file) {
      throw new BadRequestException('CSVファイルが指定されていません。')
    }

    const timeZoneOffset = 9 * 60
    const now = new Date()
    now.setTime(now.getTime() + timeZoneOffset * 60 * 1000)
    const dateTime = format(now, 'yyyyMMddHHmm')

    const fileName = path.parse(file.originalname).name
    const newFileName = `${fileName}-${dateTime}${path.extname(file.originalname)}`

    const filePath = path.join('./files', file.filename)
    const newFilePath = path.join('./files', newFileName)

    await fs.rename(filePath, newFilePath)

    const results = []
    return new Promise((resolve, reject) => {
      const stream = fs.createReadStream(newFilePath)
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
