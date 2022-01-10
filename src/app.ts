import express from 'express'
import cors from 'cors'
import routes from './routes'
import mongoose from 'mongoose'
const { MONGO_ROOT, MONGO_PASS, MONGO_PORT, MONGO_HOST, MONGO_NAME } = process.env

class App {
  public express: express.Application

  public constructor() {
    this.express = express()
    this.middlewares()
    this.routes()
  }

  private middlewares() {
    this.express.use(express.json())
    this.express.use(cors())
    this.express.use(express.urlencoded({ extended: true }))
  }
  private routes() {
    this.express.use(routes)
  }
  private database() {
    mongoose.connect(`mongodb://${MONGO_ROOT}:${MONGO_PASS}@${MONGO_HOST}:${MONGO_PORT}/${MONGO_NAME}?authSource=admin`)
    mongoose.connection.once('open', () => console.log('database connected'))
  }
}

export default new App().express