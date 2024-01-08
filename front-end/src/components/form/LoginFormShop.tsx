"use client"

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'next/navigation';

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from 'next/link';

const loginSchema = z.object({
  email: z.string().email("Formato de e-mail inválido."),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres."),
  cnpj: z.string().min(14, "O CNPJ deve ter 14 caracteres.").max(14, "O CNPJ deve ter 14 caracteres.")
});

interface LoginData {
  email: string;
  password: string;
  cnpj: string;
}

export function LoginFormShop() {
  const form = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  });
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const onSubmit = async (data: LoginData) => {
    try {
      const response = await fetch('http://localhost:3333/loginShop', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error('Falha no login. Verifique suas credenciais.');
      }

      const responseData = await response.json();

      if (responseData && responseData.id) {
        router.push('/dashboard/shops');
      } else {
        throw new Error('Falha na autenticação. Tente novamente.');
      }
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message || 'Ocorreu um erro durante o login.');
      } else {
        setErrorMessage('Ocorreu um erro inesperado.');
      }
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-1/2 lg:w-1/3">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="email@exemplo.com"{...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Senha</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Sua senha" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="cnpj"
          render={({ field }) => (
            <FormItem>
              <FormLabel>CNPJ</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Seu CNPJ"{...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {errorMessage && <div className="text-red-600">{errorMessage}</div>}

        <Button type="submit">Entrar</Button>

        <div className="text-center mt-4">
          <span className="text-muted-foreground">
            Ainda não é registrado?{' '}
            <Link href="/shopRegister" className="text-purple-900 font-bold">
              Clique aqui
            </Link>
          </span>
        </div>
      </form>
    </Form>
  );
}
