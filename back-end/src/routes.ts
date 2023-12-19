import { Router } from 'express'

import { CreateUserController } from './controllers/user/CreateUserController';
import { LoginUserController } from './controllers/user/LoginUserController';
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
import { ListNewOrdersController } from './controllers/orders/ListNewOrdersController';
import { UpdateOrderStatusController } from './controllers/orders/UpdateOrderStatusController';
import { GetAllOrdersController } from './controllers/orders/GetAllOrdersController';
import { GetOrderByIdController } from './controllers/orders/GetOrderByIdController';
import { CreateOrderController } from './controllers/orders/CreateOrderController';
import { LogoutController } from './controllers/any/LogoutController';

const router = Router();

//USER ROUTES
router.post('/users', new CreateUserController().handle)
router.post('/loginUser', new LoginUserController().handle)
router.get('/userInfo', isAuth, new DetailUserController().handle)

//SHOP ROUTES
router.post('/shops', new CreateShopController().handle)
router.post('/loginShop', new LoginShopController().handle)
router.get('/shopInfo', isAuth, new DetailShopController().handle)

//BOTH LOGOUT
router.post('/logout', new LogoutController().handle);

//PRODUCTS ROUTES
router.post('/products', new CreateProductController().handle)
router.put('/products/:id', new UpdateProductController().handle)
router.delete('/products/:id', new DeleteProductController().handle);
router.get('/products', new GetAllProductsController().handle);
router.get('/products/:id', new GetProductByIdController().handle);

//ORDERS ROUTES
router.post('/orders', new CreateOrderController().handle)
router.get('/orders/new', new ListNewOrdersController().handle);
router.put('/orders/:id/status', new UpdateOrderStatusController().handle);
router.get('/orders', new GetAllOrdersController().handle);
router.get('/orders/:id', new GetOrderByIdController().handle);


export { router };