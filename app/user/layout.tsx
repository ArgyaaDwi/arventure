// pages/user/layout.tsx
import React from 'react';
import { Header } from '@/app/user/components/Header';

interface LayoutProps {
  children: React.ReactNode;
}

const UserLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <Header />
      <main>{children}</main>
    </div>
  );
};

export default UserLayout;
