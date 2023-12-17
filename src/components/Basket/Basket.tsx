import { FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import cart from '@/assets/cart.svg';
import classes from '@/components/Basket/Basket.module.scss';

interface Props {
  productsCount: number;
}

export const Basket: FunctionComponent<Props> = ({ productsCount }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const navigateToCart = () => {
    navigate('/cart');
  };

  return (
    <button className={classes.basketWrapper} onClick={navigateToCart}>
      <span className={classes.productsCount} data-testid="products-count">
        {productsCount}
      </span>
      <img src={cart} className={classes.cart} alt={t('common:goToCart')} />
    </button>
  );
};
