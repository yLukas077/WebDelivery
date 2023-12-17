import prismaClient from '../../prisma';

class GetProductByIdService {
  async execute(id: string) {
    const product = await prismaClient.product.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        description: true,
        price: true
      }
    });

    if (!product) {
      throw new Error('Product not found.');
    }

    return product;
  }
}

export { GetProductByIdService };
