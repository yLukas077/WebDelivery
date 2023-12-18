import prismaClient from '../../prisma';

interface DeleteProductRequest {
  id: string;
  storeId: string; 
}

class DeleteProductService {
  async execute({ id, storeId }: DeleteProductRequest): Promise<void> {
    const product = await prismaClient.product.findFirst({
      where: {
        id,
        storeId
      },
    });

    if (!product) {
      throw new Error('Product not found or does not belong to the provided store.');
    }

    await prismaClient.product.delete({
      where: { id },
    });
  }
}

export { DeleteProductService };
