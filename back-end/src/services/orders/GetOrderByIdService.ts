import prismaClient from '../../prisma';

class GetOrderByIdService {
    async execute(orderId: string) {
        return await prismaClient.order.findUnique({
            where: {
                id: orderId
            },
            include: {
                customer: true,
                items: true
            }
        });
    }
}

export { GetOrderByIdService };