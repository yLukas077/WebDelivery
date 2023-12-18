import { Request, Response } from 'express';
import { UpdateProductService } from '../../services/products/UpdateProductService';

class UpdateProductController {
    async handle(req: Request, res: Response) {
        const { id, storeId } = req.params; 
        const { name, description, price } = req.body;

        const updateProductService = new UpdateProductService();

        try {
            const updatedProduct = await updateProductService.execute({
                id,
                storeId,
                name,
                description,
                price,
            });

            return res.json(updatedProduct);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
}

export { UpdateProductController };
