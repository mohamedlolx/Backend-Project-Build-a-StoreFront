import express, { Request, Response } from 'express'
import config from './config'
import morgan from 'morgan'
import db from './database/index'
import route from './routes'

//create isntace of express to our app
const app = express()
app.use(morgan('short'))
//to pare the input date as json
app.use(express.json())
//just normal get request for the server
app.get('/', (req: Request, res: Response): void => {
  res.json({
    message: "'Hello from Server Side Get Request'"
  })
})
//here the server is listening on the post to check it's running
app.listen(config.port, () => {
  console.log(`Server is working on port ${config.port}`)
})

//this is just a db test connection to give me time when the connection is done
db.connect().then((client) => {
  return client
    .query('SELECT NOW()')
    .then((res) => {
      client.release()
      console.log(res.rows)
    })
    .catch((err) => {
      client.release()
      console.log(err)
    })
})
//this is the end point to connect server to our routes
app.use('/api', route)

// this line will handle anyerror related to wrong end poing
app.use((_req: Request, res: Response) => {
  res.status(404).json({
    message: 'You are lost this is wrong route check the api routes'
  })
})

export default app
