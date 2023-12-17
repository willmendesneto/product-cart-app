import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

import { CartItem } from '@/components/CartItem';
import { TotalPrice } from '@/components/TotalPrice/index.ts';
import classes from '@/pages/Cart/Cart.module.scss';
import { CartOperation } from '@/types/models';
import { useCartStorage } from '@/utils/storage';

export const Cart = () => {
  const { t } = useTranslation();
  const [cart, setCart] = useCartStorage();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const onRemoveProduct = (productId: number): void => {
    setCart((prevCart) => {
      const updatedCart = { ...prevCart };
      delete updatedCart[productId];
      return updatedCart;
    });
  };

  const onUpdateQuantity = (productId: number, operation: CartOperation) => {
    setCart((prevCart) => {
      const updatedCart = { ...prevCart };
      if (updatedCart[productId]) {
        if (operation === 'increase') {
          updatedCart[productId] = {
            ...updatedCart[productId],
            quantity: updatedCart[productId].quantity + 1,
          };
        } else {
          updatedCart[productId] = {
            ...updatedCart[productId],
            quantity: updatedCart[productId].quantity - 1,
          };
        }
      }
      return updatedCart;
    });
  };

  const getProducts = () => Object.values(cart || {});

  const totalPrice = getProducts().reduce((accumulator, product) => accumulator + product.price * product.quantity, 0);

  return (
    <section className={classes.cartSection}>
      <h1>{t('cart:cartPageTitle')}</h1>

      <div className={classes.cartSectionWrapper}>
        {getProducts().map((product) => (
          <CartItem key={product.id} product={product} onRemoveItem={onRemoveProduct} onUpdate={onUpdateQuantity} />
        ))}
      </div>
      <TotalPrice amount={totalPrice} />
    </section>
  );
};
