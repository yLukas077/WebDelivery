import React from 'react';
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { RegisterFormUser } from "@/components/form/RegisterFormUser";

export default function UserRegistration() {
  return (
    <div className='pb-20'>
        <MaxWidthWrapper>
            <div className="pt-20 pb-14 mx-auto text-center flex flex-col items-center max-w-3xl">
                <h1 className="text-4xl font-bold tracking-tight text-purple-700 sm:text-6xl">
                Cadastro de Usuário
                </h1>
                <p className="mt-6 text-lg max-w-prose text-muted-foreground">
                Crie sua conta e comece a fazer pedidos!
                </p>
            </div>
            <div className="flex justify-center">
                <RegisterFormUser />
            </div>
        </MaxWidthWrapper>
    </div>
  );
}