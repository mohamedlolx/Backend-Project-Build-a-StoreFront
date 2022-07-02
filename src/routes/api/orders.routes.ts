import { Router } from 'express'
import * as controllers from '../../controllers/orders.controllers'
import Validation from '../../middleware/authentication.middleware'

const route = Router()

route.post('/', Validation, controllers.createOrder) //when creating new user no need to validation
route.get('/', Validation, controllers.getAllOrders) //require validation
route.get('/:order_id', Validation, controllers.getOneOrder) //require validation
route.patch('/:order_id', Validation, controllers.updateOneOrder) //require validation
route.delete('/:order_id', Validation, controllers.deleteOneOrder) //require validation
export default route
