import prismaClient from '../../prisma';

class DetailShopService {
   async execute(id: string) {
       const shop = await prismaClient.store.findUnique({
           where: {
               id: id
           }
       });

       if (!shop) {
           throw new Error('Shop not found');
       }

       return shop;
   }
}

export { DetailShopService };
