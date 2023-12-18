import prismaClient from '../../prisma';

async function ValidateCustomerId(customerId: string): Promise<boolean> {
  if (typeof customerId !== 'string' || customerId.trim() === '') {
    return false;
  }

  const customer = await prismaClient.user.findUnique({
    where: {
      id: customerId,
    },
  });

  return customer !== null;
}

export { ValidateCustomerId };
