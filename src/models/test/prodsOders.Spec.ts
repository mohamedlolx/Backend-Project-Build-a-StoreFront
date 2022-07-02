import products_ordersModel from '../products_orders.model'
import products_orders from '../../types/products_orders'
import productModel from '../products.model'
import products from '../../types/products'
import orderModel from '../orders.model'
import orders from '../../types/orders'
import userModel from '../users.model'
import users from '../../types/users'
import db from '../../database/index'

const ProdOrderModel = new products_ordersModel()
const UserModel = new userModel()
const OrderModel = new orderModel()
const ProductModel = new productModel()

describe('Products order Unit Testing', () => {
  describe('Testing the existince of the methods first', () => {
    it('should have Create one Products order methode', () => {
      expect(ProdOrderModel.createProducts_orders).toBeDefined()
    })

    it('should have Get all Products orders methode', () => {
      expect(ProdOrderModel.getAllProducts_orders).toBeDefined()
    })

    it('should have Get one Products order methode', () => {
      expect(ProdOrderModel.getOneProducts_orders).toBeDefined()
    })

    it('should have update one Products order methode', () => {
      expect(ProdOrderModel.updateProdcutsOrder).toBeDefined()
    })

    it('should have delete Products order methode', () => {
      expect(ProdOrderModel.deletePRoductsOrder).toBeDefined()
    })
  })

  describe('Testing the logic of the Products order methods', () => {
    const userr = {
      user_name: 'damn',
      first_name: 'test',
      last_name: 'test',
      password: 'test'
    } as users

    const product = {
      product_name: 'Big Bottle Water',
      price: '5LE'
    } as products

    const order = {
      order_status: 'Pending'
    } as orders

    const product_order = {
      quantity: 7
    } as products_orders

    beforeAll(async () => {
      const createUser = await UserModel.createUser(userr)
      userr.user_id = createUser.user_id
      const creatProduct = await ProductModel.createProduct(product)
      product.product_id = creatProduct.product_id
      order.user_id = createUser.user_id
      const creatOrder = await OrderModel.createOrder(order)
      order.order_id = creatOrder.order_id
      product_order.product_id = creatProduct.product_id
      product_order.order_id = creatOrder.order_id
      const createProdOrd =
        await ProdOrderModel.createProducts_orders(product_order)
      product_order.product_order_id = createProdOrd.product_order_id
    })

    afterAll(async () => {
      const connection = await db.connect()
      const sql1 = `DELETE FROM products_orders`
      await connection.query(sql1)
      const sq1l = `DELETE FROM orders`
      await connection.query(sq1l)
      const sql = `DELETE FROM products`
      await connection.query(sql)
      const sq1l3 = `DELETE FROM users`
      await connection.query(sq1l3)
      connection.release()
    })

    it('Create new products order should  return the new products order in db ', async () => {
      const creatProdOrder =
        await ProdOrderModel.createProducts_orders(product_order)
      product_order.product_order_id = creatProdOrder.product_order_id
      expect(creatProdOrder.product_id).toBe(product_order.product_id)
      expect(creatProdOrder.order_id).toBe(product_order.order_id)
      expect(creatProdOrder.quantity).toBe(product_order.quantity)
    })

    it('get all  products orders should  return all  in db ', async () => {
      const prosOrds = await ProdOrderModel.getAllProducts_orders()
      expect(prosOrds.length).toBe(2)
    })

    it('get one products order should  return specific in db ', async () => {
      const prosOrd = await ProdOrderModel.getOneProducts_orders(
        product_order.product_order_id
      )
      expect(prosOrd.product_order_id).toBe(
        product_order.product_order_id
      )
      expect(prosOrd.product_id).toBe(product_order.product_id)
      expect(prosOrd.order_id).toBe(product_order.order_id)
      expect(prosOrd.quantity).toBe(product_order.quantity)
    })

    it('update one products order should  return the updated one in db ', async () => {
      const updatedProdsOrder =
        await ProdOrderModel.updateProdcutsOrder({
          ...product_order,
          quantity: 19
        })
      expect(updatedProdsOrder.product_order_id).toBe(
        product_order.product_order_id
      )
      expect(updatedProdsOrder.quantity).toBe(19)
      expect(updatedProdsOrder.product_id).toBe(
        product_order.product_id
      )
      expect(updatedProdsOrder.order_id).toBe(product_order.order_id)
    })

    it('delete one products order should  return the deleted one  in db ', async () => {
      const deleteProdOrder =
        await ProdOrderModel.deletePRoductsOrder(
          product_order.product_order_id
        )
      expect(deleteProdOrder.product_order_id).toBe(
        product_order.product_order_id
      )
      const prodor = await OrderModel.getAllOrders()
      expect(prodor.length).toBe(1)
    })
  })
})
