import prismaClient from '../../prisma';

interface DeleteProductRequest {
  id: string;
}

class DeleteProductService {
  async execute({ id }: DeleteProductRequest): Promise<void> {
    const product = await prismaClient.product.findUnique({
      where: { id },
    });

    if (!product) {
      throw new Error('Product not found.');
    }

    await prismaClient.product.delete({
      where: { id },
    });
  }
}

export { DeleteProductService };
