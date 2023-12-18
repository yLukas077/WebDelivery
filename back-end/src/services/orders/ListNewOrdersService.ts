import prismaClient from '../../prisma';

class ListNewOrdersService {
    async execute() {
        const orders = await prismaClient.order.findMany({
            where: {
                status: 'PENDING'
            },
            include: {
                customer: {
                    select: {
                        id: true,
                        name: true
                    }
                },
                items: true
            }
        });

        return orders;
    }
}

export { ListNewOrdersService };
