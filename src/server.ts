import http from 'node:http'
import app from './app'
import Utils from './utils/Utils'
import dotenv from 'dotenv'
dotenv.config()

const server = http.createServer(app)
const PORT = process.env.PORT || 3000

server.listen(PORT, () => {
  Utils.log.info(`Server running on PORT ${PORT}`)
  // console.log(process.env.PRIVATE_KEY)
})
