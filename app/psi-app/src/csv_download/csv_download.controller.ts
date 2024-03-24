import { Controller, Get, Res, Param } from '@nestjs/common'
import { Response } from 'express'
import * as path from 'path'
import { Storage } from '@google-cloud/storage'

@Controller('download')
export class CsvDownloadController {
  // CSVファイル一覧を取得
  @Get('csv-list/:userId')
  async getCsvList(@Res() res: Response, @Param('userId') userId: string) {
    // Google Cloud Storage認証
    const storage = new Storage({
      credentials: {
        client_email: process.env.STORAGE_CLIENT_EMAIL,
        private_key: process.env.STORAGE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      },
    })
    const bucketName = 'psi-measurement'

    // バケットディレクトリ dev と prod
    const folderPath = process.env.NODE_ENV === 'development' ? `dev/${userId}` : `prod/${userId}`

    try {
      // ファイル一覧を取得
      const [files] = await storage.bucket(bucketName).getFiles({
        prefix: folderPath,
      })

      const fileList = files.map(file => path.basename(file.name))
      res.send(fileList)
    } catch (error) {
      console.error('CSVファイルの取得中にエラーが発生しました:', error)
      res.status(500).send('CSVファイルの取得中にエラーが発生しました')
    }
  }

  // 選択したCSVファイルをダウンロード
  @Get('csv/:userId/:filename/')
  async downloadCsv(@Res() res: Response, @Param('filename') filename: string, @Param('userId') userId: string) {
    // Google Cloud Storage認証
    const storage = new Storage({
      credentials: {
        client_email: process.env.STORAGE_CLIENT_EMAIL,
        private_key: process.env.STORAGE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      },
    })
    const bucketName = 'psi-measurement'

    const folderPath = process.env.NODE_ENV === 'development' ? `dev/${userId}` : `prod/${userId}`
    const filePath = path.join(folderPath, filename)

    try {
      // ファイルを取得
      const [file] = await storage.bucket(bucketName).file(filePath).get()
      if (!file) {
        res.status(404).send('CSVファイルが見つかりません')
        return
      }

      const fileStream = file.createReadStream()
      res.setHeader('Content-Type', 'text/csv')
      res.setHeader('Content-Disposition', `attachment; filename="${filename}"`)
      fileStream.pipe(res)
    } catch (error) {
      console.error('CSVファイルのダウンロード中にエラーが発生しました:', error)
      res.status(500).send('CSVファイルのダウンロード中にエラーが発生しました')
    }
  }
}
