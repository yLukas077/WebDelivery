import prismaClient from '../../prisma';
import { OrderStatus } from '@prisma/client';

class UpdateOrderStatusService {
    async execute(orderId: string, status: OrderStatus) {
        const order = await prismaClient.order.update({
            where: {
                id: orderId
            },
            data: {
                status
            }
        });

        return order;
    }
}

export { UpdateOrderStatusService };
