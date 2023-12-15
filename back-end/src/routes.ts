import { Request, Response, Router } from 'express'

import { CreateUserController } from './controllers/user/CreateUserController'
import { LoginUserController } from './controllers/user/LoginUserController'
import { DetailUserController } from './controllers/user/DetailUserController';
import { isAuth } from './middlewares/isAuth';

const router = Router();

//ROTAS USER
router.post('/users', new CreateUserController().handle)
router.post('/loginUser', new LoginUserController().handle)
router.get('/userInfo', isAuth, new DetailUserController().handle)

export { router };