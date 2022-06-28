import express, { Request, Response } from 'express'
import config from './config'
import db from './database/index'

const app = express()

app.use(express())

app.get('/', (req: Request, res: Response): void => {
  res.json({
    message: "'Hello from Server Side Get Request'"
  })
})

app.listen(config.port, () => {
  console.log(`Server is working on port ${config.port}`)
})

db.connect().then((client) => {
  return client
    .query('SELECT NOW()')
    .then((res) => {
      client.release()
      console.log(res.rows)
    })
    .catch((err) => {
      client.release()
      console.log(err.stack)
    })
})
export default app
