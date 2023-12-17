import prismaClient from '../../prisma';
import { ValidateProductName } from '../../utils/validators/ValidatorProductName';
import { ValidateProductDescription } from '../../utils/validators/ValidatorProductDescription';

interface ProductRequest {
  name: string;
  description: string;
  price: number;
  storeId: string;
}

class CreateProductService {
  async execute({ name, description, price, storeId }: ProductRequest) {
    if (!ValidateProductName(name)) {
      throw new Error('Product name is invalid.');
    }

    if (!ValidateProductDescription(description)) {
      throw new Error('Product description is invalid.');
    }

    if (price <= 0) {
      throw new Error('Price must be greater than zero.');
    }

    const product = await prismaClient.product.create({
      data: {
        name,
        description,
        price,
        storeId,
      },
      select: {
        id: true,
        name: true,
        description: true,
        price: true
        }
      });

    return product;
  }
}

export { CreateProductService };
