"use client"

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'next/navigation';
import { ErrorMessage } from '@hookform/error-message';

import { toast } from "sonner"
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import CheckBoxForms from '../CheckBoxForms';
import { Checkbox } from '../ui/checkbox';


interface FormData {
  name: string;
  email: string;
  password: string;
  terms: boolean;
}

const formSchema = z.object({
  name: z.string().min(2, { message: "O nome de usuário deve ter pelo menos 2 caracteres." }),
  email: z.string().email({ message: "Formato de e-mail inválido." }),
  password: z.string().min(6, { message: "A senha deve ter pelo menos 6 caracteres." }),
  terms: z.boolean().default(false).refine(val => val === true, {
    message: "Você precisa aceitar os termos",
  })
});

export function RegisterFormUser() {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      terms: false,
    },
  });
  const { handleSubmit, formState: { errors } } = form;
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const onSubmit = async (data: FormData) => {

    try {
      const response = await fetch('http://localhost:3333/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        toast.error("Esse endereço email já está em uso.")
        throw new Error('Erro ao registrar-se, tente novamente.');
      }

      localStorage.setItem('userEmail', data.email);

      toast.success("Email de verficação enviado!")

      router.push('/emailVerify');
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message || 'An error occurred while creating the user.');
      } else {
        setErrorMessage('An unexpected error occurred.');
      }
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <FormField control={form.control} name="name" render={({ field }) => (
          <FormItem>
            <FormLabel>Usuário</FormLabel>
            <FormControl>
              <Input placeholder="Nome Completo" {...field} />
            </FormControl>
            <FormDescription>Esse será seu nome na plataforma</FormDescription>
            <ErrorMessage errors={errors} name="name" as={<FormMessage />} />
          </FormItem>
        )} />

        <FormField control={form.control} name="email" render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input type="email" placeholder="email@exemplo.com" {...field} />
            </FormControl>
            <FormDescription>Nunca compartilharemos seu e-mail com ninguém.</FormDescription>
            <ErrorMessage errors={errors} name="email" as={<FormMessage />} />
          </FormItem>
        )} />

        <FormField control={form.control} name="password" render={({ field }) => (
          <FormItem>
            <FormLabel>Senha</FormLabel>
            <FormControl>
              <Input type="password" placeholder="Sua senha" {...field} />
            </FormControl>
            <FormDescription>Certifique-se de que tenha pelo menos 6 caracteres.</FormDescription>
            <ErrorMessage errors={errors} name="password" as={<FormMessage />} />
          </FormItem>
        )} />

        <FormField control={form.control} name="terms" render={({ field }) => (
          <FormItem className="flex items-center space-x-2">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel>
                Clicando aqui você estará concordando com nossos 
              </FormLabel>
              <FormDescription>
                <CheckBoxForms />  
              </FormDescription>
              <ErrorMessage errors={errors} name="terms" as={<FormMessage />} />
            </div>
          </FormItem>
         )}
        />
  
        <Button type="submit" className="bg-purple-700">Enviar</Button>
      </form>
    </Form>
  );
}

