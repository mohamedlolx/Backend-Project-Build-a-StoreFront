import { Router } from 'express'
import * as controllers from '../../controllers/products_orders.controllers'
import Validation from '../../middleware/authentication.middleware'

const route = Router()

route.post('/', Validation, controllers.createProducts_orders) //when creating new user no need to validation
route.get('/', Validation, controllers.getAllProducts_orders) //require validation
route.get(
  '/:product_order_id',
  Validation,
  controllers.getOneProducts_orders
) //require validation
route.patch(
  '/:product_order_id',
  Validation,
  controllers.updateProdcutsOrder
) //require validation
route.delete(
  '/:product_order_id',
  Validation,
  controllers.deletePRoductsOrder
) //require validation
export default route
