import prismaClient from '../../prisma';

class GetAllProductsService {
  async execute() {
    const products = await prismaClient.product.findMany({
      select: {
        storeId: true,
        id: true,
        name: true,
        description: true,
        price: true
      }
    });

    return products;
  }
}

export { GetAllProductsService };