import { Controller, Post, Param, UploadedFile, UseInterceptors, BadRequestException } from '@nestjs/common'
import { Multer } from 'multer'
import { FileInterceptor } from '@nestjs/platform-express'
import { format } from 'date-fns'
import * as csvParser from 'csv-parser'
import * as path from 'path'
import { Storage } from '@google-cloud/storage'

@Controller('upload')
export class CsvUploadController {
  @Post(':userId')
  @UseInterceptors(FileInterceptor('csvFile', { dest: './files' }))
  async uploadFile(@UploadedFile() file: Multer.File, @Param('userId') userId: string) {
    if (!file) {
      throw new BadRequestException('CSVファイルが指定されていません.')
    }

    // Google Cloud Storage認証
    const storage = new Storage({
      credentials: {
        client_email: process.env.STORAGE_CLIENT_EMAIL,
        private_key: process.env.STORAGE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      },
    })

    const bucketName = 'psi-measurement'
    const dev = `dev/${userId}`
    const prod = `prod/${userId}`

    const timeZoneOffset = 9 * 60 * 60 * 1000
    const now = new Date(Date.now() + timeZoneOffset)
    const dateTime = format(now, 'yyyyMMddHHmm')
    const fileName = path.parse(file.originalname).name
    const newFileName = `${fileName}-${dateTime}${path.extname(file.originalname)}`

    let folderPath: string
    if (process.env.NODE_ENV === 'development') {
      folderPath = dev
    } else {
      folderPath = prod
    }

    // ファイルのアップロード先のパスを設定
    const filePath = path.join(folderPath, newFileName)

    // Google Cloud Storageにファイルをアップロード
    await storage.bucket(bucketName).upload(file.path, {
      destination: filePath,
    })

    const [url] = await storage.bucket(bucketName).file(filePath).getSignedUrl({
      action: 'read',
      expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    })

    const results = []
    return new Promise((resolve, reject) => {
      const stream = storage.bucket(bucketName).file(filePath).createReadStream()
      stream
        .pipe(csvParser())
        .on('data', (data) => {
          const filteredData = Object.fromEntries(Object.entries(data).filter(([key, value]) => key !== ''))
          results.push(filteredData)
        })
        .on('end', () => resolve({ results, url }))
        .on('error', (error) => reject(error))
    })
  }
}
