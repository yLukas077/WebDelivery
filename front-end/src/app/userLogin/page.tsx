import React from 'react';
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { LoginFormUser } from "@/components/form/LoginFormUser";

export default function UserLogin() {
  return (
    <div className='pb-20'>
        <MaxWidthWrapper>
            <div className="pt-20 pb-14 mx-auto text-center flex flex-col items-center max-w-3xl">
                <h1 className="text-4xl font-bold tracking-tight text-purple-700 sm:text-6xl">
                Login de Usuário
                </h1>
                <p className="mt-6 text-lg max-w-prose text-muted-foreground">
                Acesse sua conta para continuar.
                </p>
            </div>
            <div className="flex justify-center">
                <LoginFormUser />
            </div>
        </MaxWidthWrapper>
    </div>
  );
}
