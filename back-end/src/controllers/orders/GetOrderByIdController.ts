import { Request, Response } from 'express';
import { GetOrderByIdService } from '../../services/orders/GetOrderByIdService';

class GetOrderByIdController {
    async handle(req: Request, res: Response) {
        const { id } = req.params;
        const getOrderByIdService = new GetOrderByIdService();

        try {
            const order = await getOrderByIdService.execute(id);
            if (!order) {
                return res.status(404).json({ error: "Order not found" });
            }
            return res.status(200).json(order);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
}

export { GetOrderByIdController };