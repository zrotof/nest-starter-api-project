export const appConfig = () => ({
  port: process.env.PORT ? parseInt(process.env.PORT, 10) : 3000,
  environment: process.env.ENVIRONMENT ? process.env.ENVIRONMENT : 'development',
  logPath: process.env.LOG_PATH || 'logs',
  database: {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    name: process.env.DB_NAME,
  }
}) 