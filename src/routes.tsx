import '@/app.module.scss';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { Cart } from '@/pages/Cart';
import { NotFound } from '@/pages/NotFound';
import { Products } from '@/pages/Products';

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Header />
      <main id="main">
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
};
