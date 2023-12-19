import { Request, Response } from 'express';
import { LoginShopService } from '../../services/shop/LoginShopService';

class LoginShopController {
    async handle(req: Request, res: Response) {
        const { cnpj, email, password } = req.body;

        const loginShopService = new LoginShopService();

        try {
            await loginShopService.execute({ cnpj, email, password }, res);
            return res.status(200).json({ message: 'Login successful' });
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
}

export { LoginShopController };
