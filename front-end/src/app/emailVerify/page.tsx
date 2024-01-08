import React from 'react';
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { AlertCircle } from "lucide-react";
import EmailVerifyForm from '../../components/form/EmailVerifyForm'; 

export default function EmailVerify() {
    return (
        <MaxWidthWrapper>
            <div className="pt-40 pb-14 mx-auto text-center flex flex-col items-center justify-center max-w-3xl">
                <AlertCircle className="h-48 w-48 text-purple-900" />
                <h2 className="mt-6 text-2xl font-semibold">Digite o Código de Verificação</h2>
                <p className="mt-3 text-lg max-w-prose text-muted-foreground">
                    Um código de 6 dígitos foi enviado para seu email.
                </p>
                <EmailVerifyForm />
            </div>
        </MaxWidthWrapper>
    );
}
