import React from 'react';
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { RegisterFormShop } from "@/components/form/RegisterFormShop";

export default function ShopRegistration() {
 return (
   <div className='pb-20'>
       <MaxWidthWrapper>
           <div className="pt-20 pb-14 mx-auto text-center flex flex-col items-center max-w-3xl">
               <h1 className="text-4xl font-bold tracking-tight text-purple-700 sm:text-6xl">
               Cadastro de Loja
               </h1>
               <p className="mt-6 text-lg max-w-prose text-muted-foreground">
               Crie sua loja e comece a receber pedidos!
               </p>
           </div>
           <div className="flex justify-center">
               <RegisterFormShop />
           </div>
       </MaxWidthWrapper>
   </div>
 );
}
