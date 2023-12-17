import { Request, Response } from 'express';
import { GetAllProductsService } from '../../services/products/GetAllProductsService';

class GetAllProductsController {
  async handle(req: Request, res: Response) {
    const getAllProductsService = new GetAllProductsService();

    try {
      const products = await getAllProductsService.execute();
      return res.json(products);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}

export { GetAllProductsController };
