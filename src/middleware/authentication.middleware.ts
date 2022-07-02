import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import config from '../config'

const Validation = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
    const auth = req.get('Authorization')
    if (auth) {
      const token = auth.split(' ')[1]
      const decoded = jwt.verify(token, config.token as string)
      if (decoded) {
        next()
      } else {
        throw new Error('Loging Error: Please Try Again')
      }
    } else {
      throw new Error('Loging Error: Please Try Again')
    }
  } catch (error) {
    throw new Error('Loging Error: Please Try Again')
  }
}

export default Validation
