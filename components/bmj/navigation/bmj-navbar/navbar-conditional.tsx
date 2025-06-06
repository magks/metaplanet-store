// components/bmj/navigation/bmj-navbar/navbar-conditional.tsx 
'use client';

import { ReactNode } from 'react';

interface NavbarConditionalProps {
  children: ReactNode;
}


function getNavbarPageClsx(): string {

  return 'relative bg-black';
}

export function NavbarConditional({ children }: NavbarConditionalProps) {
  const navBarClsxStr: string = getNavbarPageClsx();

  return <div className={navBarClsxStr}>{children}</div>;
}