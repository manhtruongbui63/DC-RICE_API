import express from 'express'
import http from 'http'
import cors from 'cors'
import { env } from '@/configs/evironment'
import { API_v1 } from './routes/v1'
import { corsOptions } from './configs/cors'
import { bodyParserConfig } from './configs/bodyParser'
import connectDB from './configs/mysqldb'
import { socket as io } from './sockets/socketIO'
import { errorHandling } from '@/middlewares/errorHandling'

const app = express()
app.use(cors(corsOptions))
connectDB()
bodyParserConfig(app)
const server = http.createServer(app)
global._io = io(server)
app.use('/api/v1', API_v1)
app.use(errorHandling)

const post = env.PORT || 9001
server.listen(post, () => {
  // eslint-disable-next-line no-console
  console.log(`Server port: ${post}`)
})
