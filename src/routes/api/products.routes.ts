import { Router } from 'express'
import * as controllers from '../../controllers/products.controllers'
import Validation from '../../middleware/authentication.middleware'

const route = Router()

route.post('/', Validation, controllers.createProduct) //when creating new user no need to validation
route.get('/', controllers.getAllProducts) //require validation
route.get('/:product_id', controllers.getOneProduct) //require validation
route.patch('/:product_id', Validation, controllers.updateOneProduct) //require validation
route.delete('/:product_id', Validation, controllers.deleteOneProduct) //require validation

export default route
