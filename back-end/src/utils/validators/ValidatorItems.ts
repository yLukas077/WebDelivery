function ValidateItems(items: { productId: string; quantity: number; }[]): boolean {
    if (!Array.isArray(items)) {
      return false;
    }
   
    for (const item of items) {
      if (typeof item.productId !== 'string' || typeof item.quantity !== 'number') {
        return false;
      }
    }
   
    return true;
}

export  { ValidateItems }
