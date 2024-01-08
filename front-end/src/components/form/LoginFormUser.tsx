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
});

interface LoginData {
  email: string;
  password: string;
}

export function LoginFormUser() {
  const form = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  });
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const onSubmit = async (data: LoginData) => {
    try {
      const response = await fetch('http://localhost:3333/loginUser', {
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
  
      if (responseData && responseData.message === "Login successful") {
        router.push('/dashboard/users');
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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


        {errorMessage && <div className="text-red-600">{errorMessage}</div>}

        <Button type="submit">Entrar</Button>

        <div className="text-center mt-4">
          <span className="text-muted-foreground">
            Ainda não é registrado?{' '}
            <Link href="/userRegister" className="text-purple-900 font-bold">
              Clique aqui
            </Link>
          </span>
        </div>

      </form>
    </Form>
  );
}
