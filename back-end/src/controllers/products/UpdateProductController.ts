import { Request, Response } from 'express';
import { UpdateProductService } from '../../services/products/UpdateProductService';

class UpdateProductController {
    async handle(req: Request, res: Response) {
        const { id } = req.params; // Assume que o ID do produto vem dos parâmetros da URL
        const { name, description, price } = req.body;

        const updateProductService = new UpdateProductService();

        try {
            const updatedProduct = await updateProductService.execute({
                id,
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
