import { Request, Response } from 'express';
import { CreateProductService } from '../../services/products/CreateProductService';

class CreateProductController {
    async handle(req: Request, res: Response) {
        const { name, description, price, storeId } = req.body;

        const createProductService = new CreateProductService();

        try {
            const product = await createProductService.execute({
                name,
                description,
                price,
                storeId
            });

            return res.status(201).json(product);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
}

export { CreateProductController };