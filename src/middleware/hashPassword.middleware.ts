import config from '../config'
import bcrypt from 'bcrypt'

const hashPassword = (password: string) => {
  const salt: number = parseInt(config.salt as string, 10)
  return bcrypt.hashSync(`${password}${config.pepper}`, salt)
}

export default hashPassword
