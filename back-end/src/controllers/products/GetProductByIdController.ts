import { Request, Response } from 'express';
import { GetProductByIdService } from '../../services/products/GetProductByIdService';

class GetProductByIdController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;
    const getProductByIdService = new GetProductByIdService();

    try {
      const product = await getProductByIdService.execute(id);
      return res.json(product);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}

export { GetProductByIdController };
