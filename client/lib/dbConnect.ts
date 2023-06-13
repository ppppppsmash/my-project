import mysql from 'mysql2/promise'

export const dbConnect = async () => {
  try {
    const db: any = await mysql.createConnection({
      host: process.env.MYSQL_HOST,
      port: Number(process.env.MYSQL_PORT),
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_ROOT_PASSWORD,
      database: process.env.MYSQL_DATABASE,
    })
    return db
  } catch (error) {
    console.log(`DB connection error ${error}`)
  }
}
