import { Request, Response } from 'express';
import { DetailShopService } from '../../services/shop/DetailShopService';

class DetailShopController {
 async handle(req: Request, res: Response) {
     const shop_id = req.user_id;

     const detailShopService = new DetailShopService();

     try {
         const shop = await detailShopService.execute(shop_id);

         const shopDetails = {
             id: shop.id,
             name: shop.name,
             email: shop.email,
             cnpj: shop.cnpj
         };

         return res.json(shopDetails);
     } catch (error) {
         return res.status(400).json({ error: error.message });
     }
 }
}

export { DetailShopController };
