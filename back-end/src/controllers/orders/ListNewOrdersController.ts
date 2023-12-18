import { Request, Response } from 'express';
import { ListNewOrdersService } from '../../services/orders/ListNewOrdersService';

class ListNewOrdersController {
    async handle(req: Request, res: Response): Promise<Response> {
        const listNewOrdersService = new ListNewOrdersService();

        try {
            const orders = await listNewOrdersService.execute();
            return res.status(200).json(orders);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
}

export { ListNewOrdersController };
