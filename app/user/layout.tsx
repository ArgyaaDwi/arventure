// pages/user/layout.tsx
import React from 'react';
import { Header } from '@/app/user/components/Header';
import { FooterLinks } from '@/components/Footer';
import { FeaturesCards } from './components/Feature';

interface LayoutProps {
  children: React.ReactNode;
}

const UserLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div >

      <Header />
      <main>{children}</main>
      <FooterLinks />
    </div>
  );
};

export default UserLayout;
