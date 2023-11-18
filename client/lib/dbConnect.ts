import mysql from 'mysql2/promise'

export const dbConnect = async () => {
  try {
    const db: any = await mysql.createConnection({
      socketPath: process.env.DATABASE_CLOUD_SQL_EXTRA,
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_ROOT_PASSWORD,
      database: process.env.DATABASE_DB,
    })
    return db
  } catch (error) {
    console.log(`DB connection error ${error}`)
  }
}
