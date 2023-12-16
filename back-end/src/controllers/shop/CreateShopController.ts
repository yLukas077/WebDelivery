import { Request, Response } from 'express';
import { CreateShopService } from '../../services/shop/CreateShopService';

class CreateShopController {
    async handle(req: Request, res: Response) {
        const { name, email, password, description, address, cnpj, phone, type } = req.body;

        const createShopService = new CreateShopService();

        try {
            const shop = await createShopService.execute({
                name,
                email,
                password,
                description,
                address,
                cnpj,
                phone,
                type
            });

            return res.json(shop);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
}

export { CreateShopController };
