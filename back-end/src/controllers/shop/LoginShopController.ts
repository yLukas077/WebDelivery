import { Request, Response } from 'express';
import { LoginShopService } from '../../services/shop/LoginShopService';

class LoginShopController {
   async handle(req: Request, res: Response) {
       const { cnpj, email, password } = req.body;

       const loginShopService = new LoginShopService();

       try {
           const login = await loginShopService.execute({
               cnpj,
               email,
               password
           });

           return res.json(login);
       } catch (error) {
           return res.status(400).json({ error: error.message });
       }
   }
}

export { LoginShopController };
