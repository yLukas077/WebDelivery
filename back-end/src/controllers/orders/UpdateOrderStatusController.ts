import { Request, Response } from 'express';
import { UpdateOrderStatusService } from '../../services/orders/UpdateOrderStatusService';
import { OrderStatus } from '@prisma/client';

class UpdateOrderStatusController {
    async handle(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        const status = req.body.status as OrderStatus;

        if (!Object.values(OrderStatus).includes(status)) {
            return res.status(400).json({ error: "Invalid order status" });
        }

        const updateOrderStatusService = new UpdateOrderStatusService();

        try {
            const order = await updateOrderStatusService.execute(id, status);
            return res.status(200).json(order);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
}

export { UpdateOrderStatusController };
