"use client"

import React, { useEffect, useRef } from 'react';
import Typed from 'typed.js';

interface AnimatedTextProps {
  strings: string[];
  typeSpeed?: number;
  backSpeed?: number;
  loop?: boolean;
}

const AnimatedText: React.FC<AnimatedTextProps> = ({ 
  strings, 
  typeSpeed = 50, 
  backSpeed = 50, 
  loop = true 
}) => {
  const typedTarget = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const options = {
      strings,
      typeSpeed,
      backSpeed,
      loop
    };

    const typed = new Typed(typedTarget.current!, options);

    return () => typed.destroy();
  }, [strings, typeSpeed, backSpeed, loop]);

  return <span ref={typedTarget}></span>;
};

export default AnimatedText;
