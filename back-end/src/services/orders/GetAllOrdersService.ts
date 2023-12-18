import prismaClient from '../../prisma';

class GetAllOrdersService {
    async execute() {
        return await prismaClient.order.findMany({
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
    }
}

export { GetAllOrdersService };
