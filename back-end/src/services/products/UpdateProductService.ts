import prismaClient from '../../prisma';
import { ValidateProductName } from '../../utils/validators/ValidatorProductName';
import { ValidateProductDescription } from '../../utils/validators/ValidatorProductDescription';

interface UpdateProductRequest {
  id: string;
  name?: string;
  description?: string;
  price?: number;
  storeId: string;
}

class UpdateProductService {
  async execute({ id, name, description, price, storeId }: UpdateProductRequest) {
    const existingStore = await prismaClient.store.findUnique({
      where: { id: storeId },
    });
    if (!existingStore) {
      throw new Error('Store not found.');
    }

    const existingProduct = await prismaClient.product.findUnique({
      where: { id },
    });

    if (!existingProduct) {
      throw new Error('Product not found.');
    }

    if (name && !ValidateProductName(name)) {
      throw new Error('Product name is invalid.');
    }

    if (description && !ValidateProductDescription(description)) {
      throw new Error('Product description is invalid.');
    }

    if (price !== undefined && price <= 0) {
      throw new Error('Price must be greater than zero.');
    }

    const updatedProduct = await prismaClient.product.update({
      where: { id },
      data: {
        name: name || existingProduct.name,
        description: description || existingProduct.description,
        price: price !== undefined ? price : existingProduct.price,
        storeId, 
      },
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        storeId: true,
      },
    });

    return updatedProduct;
  }
}

export { UpdateProductService };
