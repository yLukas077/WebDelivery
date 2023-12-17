import prismaClient from '../../prisma';
import { ValidateProductName } from '../../utils/validators/ValidatorProductName';
import { ValidateProductDescription } from '../../utils/validators/ValidatorProductDescription';

interface UpdateProductRequest {
  id: string;
  name?: string;
  description?: string;
  price?: number;
}

class UpdateProductService {
  async execute({ id, name, description, price }: UpdateProductRequest) {
    const existingProduct = await prismaClient.product.findUnique({
      where: { id },
    });

    console.log("ID recebido:", id);

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
      },
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
      },
    });

    return updatedProduct;
  }
}

export { UpdateProductService };
