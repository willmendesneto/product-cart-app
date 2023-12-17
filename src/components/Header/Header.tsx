import { FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import logo from '/logo.svg';
import { Basket } from '@/components/Basket/Basket';
import classes from '@/components/Header/Header.module.scss';
import { useCartStorage } from '@/utils/storage';

export const Header: FunctionComponent = () => {
  const { t } = useTranslation();
  const [cart] = useCartStorage();

  const productsCount = Object.keys(cart || {}).length;

  return (
    <header className={classes.headerWrapper}>
      <div>
        <Link to="/">
          <img src={logo} className={classes.logo} alt={t('common:app')} />
        </Link>
      </div>
      <div>
        <Basket productsCount={productsCount} />
      </div>
    </header>
  );
};
