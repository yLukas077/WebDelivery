import AnimatedText from "@/components/AnimatedText";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { buttonVariants } from "@/components/ui/button";
import { ClipboardSignature, LayoutList, PiggyBank } from "lucide-react";
import Link from "next/link";

const perks = [
  {
    name: "Praticidade no pedido",
    Icon: ClipboardSignature,
    description: "Pediu, confirmou e pronto!"
  },
  {
    name: "Baixas taxas para nossos parceiros",
    Icon: PiggyBank,
    description: "Custos de assinatura baixa e taxas de serviços feitas para você, pequeno e médio empreendedor."
  },
  {
    name: "Compre os mais diversos itens",
    Icon: LayoutList,
    description: "Aproveite e além da janta do seu sextou, peça também a feira do mercado da semana seguinte!"
  }
]


export default function Home() {
  return(
    <>
      <MaxWidthWrapper>
        <div className="py-20 mx-auto text-center flex flex-col items-center max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Seu site favorito para pedir{' '}
            <span className="text-purple-600">
              <AnimatedText 
              strings={["lanches", "pratos completos", "itens de supermercado"]} 
              />
            </span>
          </h1>
          <p className="mt-6 text-lg max-w-prose text-muted-foreground">
            Pedidos rápidos? taxas baixas? uso simples? Tudo isso e muito mais com apenas alguns cliques.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <Link href='/userRegister' className={buttonVariants()}>Quero fazer um pedido &rarr;</Link>
            <Link href='/shopRegister' className={buttonVariants()}>Quero vender meus pratos &rarr;</Link>
          </div>
        </div>
      </MaxWidthWrapper>

      <section className="border-t border-gray-200 bg-gray-50">
        <MaxWidthWrapper className="py-20">
          <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-0">
            {perks.map((perk) => (
              <div key={perk.name} className="text-center md:flex md:items-start md:text-left lg:block lg:text-center">
                <div className="md:flex-shrink-0 flex justify-center">
                  <div className="h-16 w-16 flex items-center justify-center rounded-full bg-blue-100 text-purple-900">
                    <perk.Icon className="w-1/3 h-1/3"/>
                  </div>
                </div>
                <div className="mt-6 md:ml-4 md:mt-0 lg:ml-0 lg:mt-6">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">{perk.name}</h3>
                  <p className="mt-3 text-sm text-muted-foreground">{perk.description}</p>
                </div>
              </div>
            ))}
          </div>
        </MaxWidthWrapper>
      </section>
    </>
  )
}
