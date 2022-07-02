import db from '../database/index'
import users from '../types/users'
import hashPassword from '../middleware/hashPassword.middleware'
import config from '../config'
import bcrypt from 'bcrypt'

class userModel {
  //create user
  async createUser(user: users): Promise<users> {
    try {
      const connection = await db.connect()
      const sql = `INSERT INTO users (user_name, first_name, last_name, password)
        VALUES ($1, $2, $3, $4) RETURNING user_id, user_name, first_name, last_name`
      const result = await connection.query(sql as string, [
        user.user_name,
        user.first_name,
        user.last_name,
        hashPassword(user.password)
      ])
      connection.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(
        `unable to create your user_name:(${
          user.user_name
        }) because:  ${(error as Error).message}`
      )
    }
  }
  //get all users
  async getAllUsers(): Promise<users[]> {
    try {
      const connection = await db.connect()
      const sql = `SELECT  user_id, user_name, first_name, last_name FROM users`
      const result = await connection.query(sql)
      connection.release()
      return result.rows
    } catch (error) {
      throw new Error(`unable to get all users from the database`)
    }
  }
  //get one user
  async getOneUser(user_id: string): Promise<users> {
    try {
      const connection = await db.connect()
      const sql = `SELECT  user_id, user_name, first_name, last_name FROM users WHERE user_id=$1`
      const result = await connection.query(sql, [user_id])
      connection.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(
        `unable to get the user from the database because ${
          (error as Error).message
        }`
      )
    }
  }
  //update one user
  async updateOneUser(user: users): Promise<users> {
    try {
      const connection = await db.connect()
      const sql = `UPDATE users set ( user_name, first_name, last_name, password) = 
      ($1,$2,$3,$4) WHERE user_id=$5  RETURNING user_id, user_name, first_name, last_name`
      const result = await connection.query(sql as string, [
        user.user_name,
        user.first_name,
        user.last_name,
        hashPassword(user.password),
        user.user_id
      ])
      connection.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(
        `unable to update user from the database because ${
          (error as Error).message
        }`
      )
    }
  }
  //delete one user
  async deleteOneUser(user_id: string): Promise<users> {
    try {
      const connection = await db.connect()
      const sql = `DELETE FROM users WHERE user_id=$1 RETURNING user_id, user_name, first_name, last_name`
      const result = await connection.query(sql, [user_id])
      connection.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(
        `Can not delte user baeause : ${(error as Error).message}`
      )
    }
  }
  //authenticate one user
  async authenticateOneUser(
    user_name: string,
    password: string
  ): Promise<users | null> {
    try {
      const connection = await db.connect()
      const sql = `SELECT password FROM users WHERE user_name=$1`
      const result = await connection.query(sql, [user_name])
      if (result.rows.length) {
        const { password: hashPassword } = result.rows[0]
        const isValid = bcrypt.compareSync(
          `${password}${config.pepper}`,
          hashPassword
        )
        if (isValid) {
          const connection = await db.connect()
          const dataUser = await connection.query(
            `
          SELECT user_id, user_name, first_name, last_name FROM users where user_name=$1`,
            [user_name]
          )
          return dataUser.rows[0]
        }
      }
      connection.release()
      return null
    } catch (error) {
      throw new Error(
        `Can not authenticate user baeause : ${
          (error as Error).message
        }`
      )
    }
  }
}

export default userModel
