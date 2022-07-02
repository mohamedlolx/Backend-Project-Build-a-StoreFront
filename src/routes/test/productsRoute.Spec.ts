import supertest from 'supertest'
import app from '../../index'
import products from '../../types/products'
import db from '../../database/index'
import productModel from '../../models/products.model'
import userModel from '../../models/users.model'
import users from '../../types/users'

const ProductModel = new productModel()
const UserModel = new userModel()
const request = supertest(app)
let token = ''

describe(',,Testing the loginc of the Products Model END POINTS', () => {
  const product = {
    product_name: 'Big Bottle Water',
    price: '5LE'
  } as products

  const user = {
    user_name: 'test',
    first_name: 'test',
    last_name: 'test',
    password: 'test'
  } as users

  beforeAll(async () => {
    const createUser = await UserModel.createUser(user)
    user.user_id = createUser.user_id
    const creatProduct = await ProductModel.createProduct(product)
    product.product_id = creatProduct.product_id
  })

  afterAll(async () => {
    const connection = await db.connect()
    const sql1 = `DELETE FROM users`
    await connection.query(sql1)
    const sql = `DELETE FROM products`
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
  describe('Testing CRUD Operation methods for Products model', () => {
    it('Create User new product', async () => {
      const res = await request
        .post('/api/products/')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({
          product_name: 'product',
          price: '10LE'
        } as products)
      expect(res.status).toBe(200)
      const { product_name, price } = res.body.data
      expect(product_name).toBe('product')
      expect(price).toBe('10LE')
    })

    it('should get list of products', async () => {
      const res = await request
        .get('/api/products/')
        .set('Content-type', 'application/json')
      expect(res.status).toBe(200)
      expect(Object.keys(res.body.data).length).toBe(2)
    })

    it('should get one of product', async () => {
      const res = await request
        .get(`/api/products/${product.product_id}/`)
        .set('Content-type', 'application/json')
      const { product_name, price } = res.body.data
      expect(product_name).toBe('Big Bottle Water')
      expect(price).toBe('5LE')
    })

    it('should update one of product', async () => {
      const res = await request
        .patch(`/api/products/${product.product_id}/`)
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({
          ...product,
          product_name: 'Chips Large',
          price: '9LE'
        })
      expect(res.status).toBe(200)
      const { product_id, product_name, price } = res.body.data
      expect(product_id).toBe(product.product_id)
      expect(product_name).toBe('Chips Large')
      expect(price).toBe('9LE')
    })

    it('should delete one of products', async () => {
      const res = await request
        .delete(`/api/products/${product.product_id}/`)
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
      expect(res.status).toBe(200)
      expect(res.body.data.product_id).toBe(product.product_id)
      expect(res.body.data.product_name).toBe('Chips Large')
      expect(res.body.data.price).toBe('9LE')
    })
  })
})
