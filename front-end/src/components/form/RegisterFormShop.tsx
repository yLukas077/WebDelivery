"use client"

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'next/navigation';

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from '../ui/checkbox';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandGroup, CommandItem, CommandEmpty } from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { Check, ChevronDown } from 'lucide-react';
import { toast } from 'sonner';

interface ShopRequest {
  name: string;
  email: string;
  password: string;
  description: string;
  address: string;
  cnpj: string;
  phone: string;
  type: string;
}

const shopTypes = [
  { label: "Mercado", value: "mercado" },
  { label: "Restaurante", value: "restaurante" },
  { label: "Fastfood", value: "fastfood" },
];

const shopValidator = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email(),
  password: z.string().min(6).max(20),
  description: z.string().min(10).max(200),
  address: z.string().min(10).max(100),
  cnpj: z.string().length(18).regex(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/),
  phone: z.string().regex(/^\(\d{2}\) \d{4,5}-\d{4}$/),
  type: z.enum(['mercado', 'restaurante', 'fastfood']),
});

export function RegisterFormShop() {
  const form = useForm<ShopRequest>({ resolver: zodResolver(shopValidator) });
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const onSubmit = async (data: ShopRequest) => {
    try {
      const response = await fetch('http://localhost:3333/shops', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        toast.error("CNPJ ou endereço de email já em uso")
        throw new Error('Erro ao registrar-se, tente novamente.');
      }

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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome da Loja</FormLabel>
              <FormControl>
                <Input placeholder="Ex: Loja do João" {...field} />
              </FormControl>
              <FormDescription>Nome da loja (2 a 50 caracteres)</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="contato@lojadojoao.com.br" {...field} />
              </FormControl>
              <FormDescription>Insira um e-mail válido</FormDescription>
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
                <Input type="password" placeholder="Senha de no mínimo 6 caracteres" {...field} />
              </FormControl>
              <FormDescription>Senha (6 a 20 caracteres)</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição</FormLabel>
              <FormControl>
                <Input placeholder="Breve descrição da sua loja e produtos" {...field} />
              </FormControl>
              <FormDescription>Descrição da loja (10 a 200 caracteres)</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Endereço</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Rua Exemplo, 123, Bairro, Cidade" {...field} />
              </FormControl>
              <FormDescription>Endereço completo da loja (10 a 100 caracteres)</FormDescription>
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
                <Input type="text" placeholder="00.000.000/0001-00" {...field} />
              </FormControl>
              <FormDescription>CNPJ da loja (14 dígitos)</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Telefone</FormLabel>
              <FormControl>
                <Input type="tel" placeholder="(XX) 99999-9999" {...field} />
              </FormControl>
              <FormDescription>Telefone no formato (XX) XXXX-XXXX ou (XX) XXXXX-XXXX</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Tipo de Loja</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-[200px] justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? shopTypes.find((type) => type.value === field.value)?.label
                        : "Selecionar tipo de loja"}
                      <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandEmpty>Nenhum tipo encontrado.</CommandEmpty>
                    <CommandGroup>
                      {shopTypes.map((type) => (
                        <CommandItem
                          value={type.label}
                          key={type.value}
                          onSelect={() => {
                            form.setValue("type", type.value)
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              type.value === field.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {type.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="items-top flex space-x-2">
          <Checkbox id="terms2" />
          <div className="grid gap-1.5 leading-none">
            <label htmlFor="terms2" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Aceitar termos e condições
            </label>
            <p className="text-sm text-muted-foreground">
              Você concorda com nossos Termos de Serviço e Política de Privacidade.
            </p>
          </div>
        </div>

        {errorMessage && <div className="text-red-600">{errorMessage}</div>}

        <Button type="submit" className="bg-purple-700">Criar Loja</Button>
      </form>
    </Form>
  );
}

