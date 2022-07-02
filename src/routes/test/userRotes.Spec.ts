import supertest from 'supertest'
import app from '../../index'
import users from '../../types/users'
import db from '../../database/index'
import userModel from '../../models/users.model'

const UserModel = new userModel()
const request = supertest(app)
let token = ''

describe('User Api end-point', () => {
  const user = {
    user_name: 'test',
    first_name: 'test',
    last_name: 'test',
    password: 'test'
  } as users

  beforeAll(async () => {
    const createUser = await UserModel.createUser(user)
    user.user_id = createUser.user_id
  })

  afterAll(async () => {
    const connection = await db.connect()
    const sql = `DELETE FROM users`
    await connection.query(sql)
    connection.release()
  })

  describe('Test Authentication Method', () => {
    it('should be able to authenticate to get token ', async () => {
      const res = await request
        .post('/api/users/authenticate')
        .set('Content-type', 'application/json')
        .send({ user_name: 'test', password: 'test' })
      expect(res.status).toBe(200)
      const {
        user_id,
        user_name,
        first_name,
        last_name,
        token: userToken
      } = res.body.data
      expect(user_id).toBe(user.user_id)
      expect(user_name).toBe(user.user_name)
      expect(first_name).toBe(user.first_name)
      expect(last_name).toBe(user.last_name)
      token = userToken
    })

    it('should be failed to authenticated  with wrong user_name', async () => {
      const res = await request
        .post('/api/users/authenticate')
        .set('Content-type', 'application/json')
        .send({ user_name: 'asd', password: 'asd' })
      expect(res.status).toBe(401)
    })
  })
  describe('Testing CRUD Operation methods for USERMODEL', () => {
    it('Create User new one', async () => {
      const res = await request
        .post('/api/users/')
        .set('Content-type', 'application/json')
        .send({
          user_name: 'test1',
          first_name: 'test1',
          last_name: 'test1',
          password: 'test1'
        } as users)
      expect(res.status).toBe(200)
      const { user_name, first_name, last_name } = res.body.data.user
      expect(user_name).toBe('test1')
      expect(first_name).toBe('test1')
      expect(last_name).toBe('test1')
    })

    it('should get list of users', async () => {
      const res = await request
        .get('/api/users/')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
      expect(res.status).toBe(200)
      expect(res.body.data.users.length).toBe(2)
    })

    it('should get one of users', async () => {
      const res = await request
        .get(`/api/users/${user.user_id}`)
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
      const { user_id, user_name, first_name, last_name } =
        res.body.data.user
      expect(user_id).toBe(user.user_id)
      expect(user_name).toBe('test')
      expect(first_name).toBe('test')
      expect(last_name).toBe('test')
    })

    it('should update one of users', async () => {
      const res = await request
        .patch(`/api/users/${user.user_id}`)
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({
          ...user,
          user_name: 'test2',
          first_name: 'test2',
          last_name: 'test2'
        })
      expect(res.status).toBe(200)
      const { user_id, user_name, first_name, last_name } =
        res.body.data.user
      expect(user_id).toBe(user.user_id)
      expect(user_name).toBe('test2')
      expect(first_name).toBe('test2')
      expect(last_name).toBe('test2')
    })

    it('should delete one of users', async () => {
      const res = await request
        .delete(`/api/users/${user.user_id}`)
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
      expect(res.status).toBe(200)
      expect(res.body.data.user_id).toBe(user.user_id)
      expect(res.body.data.user_name).toBe('test2')
    })
  })
})
