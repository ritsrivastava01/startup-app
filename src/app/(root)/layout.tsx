import { NavBar } from '@/components/Navbar';
import React, { ReactNode } from 'react';

const Layout = ({ children }: { children: Readonly<ReactNode> }) => {
  return (
    <div className='font-work-sans'>
      <NavBar />
      {children}
    </div>
  );
};

export default Layout;
