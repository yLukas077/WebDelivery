import prismaClient from '../../prisma';
import { ValidateCustomerId } from '../../utils/validators/ValidatorCustomerId';
import { ValidateItems } from '../../utils/validators/ValidatorItems';

interface OrderItemRequest {
  productId: string;
  quantity: number;
}

interface OrderRequest {
  customerId: string;
  items: OrderItemRequest[];
}

class CreateOrderService {
  async execute({ customerId, items }: OrderRequest) {
    if (!await ValidateCustomerId(customerId)) {
      throw new Error('Invalid customer ID.');
    }

    if (!ValidateItems(items)) {
      throw new Error('Invalid order items.');
    }

    // Recuperar os preços dos produtos do banco de dados
    const itemsWithPrices = await Promise.all(items.map(async (item) => {
      const product = await prismaClient.product.findUnique({
        where: { id: item.productId },
      });

      if (!product) {
        throw new Error(`Product with ID ${item.productId} not found.`);
      }

      return {
        ...item,
        price: product.price,
      };
    }));

    const total = itemsWithPrices.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const order = await prismaClient.order.create({
      data: {
        customerId,
        total,
        items: {
          create: itemsWithPrices.map(item => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
    });

    return order;
  }
}

export { CreateOrderService };
