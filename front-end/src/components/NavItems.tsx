"use client"

import Link from "next/link";
import { useState } from "react";

interface Category {
  name: string;
  href: string;
}

const NavItems = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const categories: Category[] = [
    { name: 'Sobre Nós', href: '/about' },
    { name: 'Regiões que Atendemos', href: '/regions' },
    { name: 'Nossos Planos', href: '/plans' },
  ];

  return (
    <div className="flex justify-center gap-4 h-full items-center">
      {categories.map((category, index, { length }) => (
        <>
          <Link key={index} href={category.href}>
            <div
              onClick={() => setActiveIndex(index)}
              className={`cursor-pointer font-bold px-1 
                ${activeIndex === index ? 'text-purple-900' : 'text-purple-500'} 
                hover:text-purple-700 transition-colors duration-300`}
              style={{ textDecoration: 'none' }}
            >
              {category.name}
            </div>
          </Link>
          {index < length - 1 && <span className="text-gray-300">|</span>}
        </>
      ))}
    </div>
  );
};

export default NavItems;
