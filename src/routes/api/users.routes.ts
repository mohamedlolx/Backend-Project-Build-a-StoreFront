import { Router } from 'express'
import * as controllers from '../../controllers/users.controllers'
import Validation from '../../middleware/authentication.middleware'

const route = Router()

route.post('/', controllers.createUser) //when creating new user no need to validation
route.get('/', Validation, controllers.getAllUsers) //require validation
route.get('/:user_id', Validation, controllers.getOneUser) //require validation
route.patch('/:user_id', Validation, controllers.updateOneUser) //require validation
route.delete('/:user_id', Validation, controllers.deleteOneUser) //require validation
route.post(`/authenticate`, controllers.authenticateOneUser) //the main validation
export default route
