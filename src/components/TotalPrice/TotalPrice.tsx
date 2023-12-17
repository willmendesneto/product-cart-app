import { FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';

import classes from '@/components/TotalPrice/TotalPrice.module.scss';

interface TotalPriceProps {
  amount: number;
}

export const TotalPrice: FunctionComponent<TotalPriceProps> = ({ amount }) => {
  const { t } = useTranslation();
  return (
    <div className={classes.totalPriceWrapper}>
      {t('cart:cartTotalLabel', { total: t('{{value, currency}}', { value: amount }) })}
    </div>
  );
};
