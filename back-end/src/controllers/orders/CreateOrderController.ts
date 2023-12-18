import { Request, Response } from 'express';
import { CreateOrderService } from '../../services/orders/CreateOrderService';

class CreateOrderController {
    async handle(req: Request, res: Response) {
        const { customerId, items } = req.body;

        const createOrderService = new CreateOrderService();

        try {
            const order = await createOrderService.execute({ customerId, items });
            return res.status(201).json(order);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
}

export { CreateOrderController };