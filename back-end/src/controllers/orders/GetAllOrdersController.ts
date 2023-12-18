import { Request, Response } from 'express';
import { GetAllOrdersService } from '../../services/orders/GetAllOrdersService';

class GetAllOrdersController {
    async handle(req: Request, res: Response) {
        const getAllOrdersService = new GetAllOrdersService();

        try {
            const orders = await getAllOrdersService.execute();
            return res.status(200).json(orders);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
}

export { GetAllOrdersController };
