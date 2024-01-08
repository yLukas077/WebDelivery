"use client"

import * as React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';

const CheckBoxForms = () => {
  const [open, setOpen] = React.useState(false);

  const handleToggle = () => setOpen(!open);

  const TermsContent = (
        <ScrollArea className="h-[400px] overflow-y-auto p-4 text-gray-700">
        <h1 className="text-2xl font-bold mb-4">Termos de Serviço e Política de Privacidade</h1>
        <h2 className="text-xl font-semibold mt-6 mb-2">1. Introdução</h2>
        <p>Estes Termos de Serviço regulam o uso deste site e de todos os serviços oferecidos. Ao acessar este site, você concorda em cumprir estes termos.</p>

        <h2 className="text-xl font-semibold mt-6 mb-2">2. Privacidade</h2>
        <p>A sua privacidade é muito importante para nós. A nossa Política de Privacidade explica como coletamos e utilizamos suas informações pessoais.</p>

        <h2 className="text-xl font-semibold mt-6 mb-2">3. Direitos Autorais e Propriedade Intelectual</h2>
        <p>Todos os conteúdos disponíveis neste site, incluindo textos, gráficos e logos, são propriedade do site ou de seus colaboradores e estão protegidos por leis de direitos autorais.</p>

        <h2 className="text-xl font-semibold mt-6 mb-2">4. Uso Aceitável</h2>
        <p>É proibido usar este site de maneira que possa danificar, desabilitar ou sobrecarregar nossos servidores ou redes, ou que interfira no uso e gozo do site por terceiros.</p>

        <h2 className="text-xl font-semibold mt-6 mb-2">5. Modificações nos Termos</h2>
        <p>Reservamo-nos o direito de modificar estes termos a qualquer momento. As alterações entram em vigor assim que são publicadas no site.</p>

        <h2 className="text-xl font-semibold mt-6 mb-2">6. Limitação de Responsabilidade</h2>
        <p>Não seremos responsáveis por quaisquer danos ou prejuízos resultantes do uso ou da incapacidade de usar este site ou seus serviços.</p>
    </ScrollArea>
  );

  return (
    <>
      <button type="button" onClick={handleToggle} className="text-purple-600 hover:text-purple-800 underline decoration-purple-600">
        Termos de Serviço e Política de Privacidade
      </button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md mx-auto">
          <DialogHeader className="flex justify-between items-center">
          </DialogHeader>
          {TermsContent}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CheckBoxForms;
