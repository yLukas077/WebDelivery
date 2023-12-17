import { Request, Response } from 'express';
import { DeleteProductService } from '../../services/products/DeleteProductService';

class DeleteProductController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const deleteProductService = new DeleteProductService();

    try {
      await deleteProductService.execute({ id });
      return res.status(200).json({ message: 'Product successfully deleted.' });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}

export { DeleteProductController };
