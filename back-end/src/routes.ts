import { Request, Response, Router } from 'express'

import { CreateUserController } from './controllers/user/CreateUserController'
import { LoginUserController } from './controllers/user/LoginUserController'
import { DetailUserController } from './controllers/user/DetailUserController';
import { isAuth } from './middlewares/isAuth';
import { CreateShopController } from './controllers/shop/CreateShopController';
import { LoginShopController } from './controllers/shop/LoginShopController';
import { DetailShopController } from './controllers/shop/DetailShopController';
import { CreateProductController } from './controllers/products/CreateProductController';
import { UpdateProductController } from './controllers/products/UpdateProductController';
import { DeleteProductController } from './controllers/products/DeleteProductController';
import { GetAllProductsController } from './controllers/products/GetAllProductsController';
import { GetProductByIdController } from './controllers/products/GetProductByIdController';

const router = Router();

//ROTAS USER
router.post('/users', new CreateUserController().handle)
router.post('/loginUser', new LoginUserController().handle)
router.get('/userInfo', isAuth, new DetailUserController().handle)

//ROTAS SHOP
router.post('/shops', new CreateShopController().handle)
router.post('/loginShop', new LoginShopController().handle)
router.get('/shopInfo', isAuth, new DetailShopController().handle)

//ROTAS PRODUCTS
router.post('/products', new CreateProductController().handle)
router.put('/products/:id', new UpdateProductController().handle)
router.delete('/products/:id', new DeleteProductController().handle);
router.get('/products', new GetAllProductsController().handle);
router.get('/products/:id', new GetProductByIdController().handle);

export { router };