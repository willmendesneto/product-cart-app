import { FunctionComponent, useState } from 'react';
import { useTranslation } from 'react-i18next';

import classes from '@/components/Quantifier/Quantifier.module.scss';
import { CartOperation } from '@/types/models';

interface Props {
  removeProductCallback: (productId: number) => void;
  handleUpdateQuantity: (productId: number, operation: CartOperation) => void;
  productId: number;
}

export const Quantifier: FunctionComponent<Props> = ({ removeProductCallback, handleUpdateQuantity, productId }) => {
  const [value, setValue] = useState<number>(1);
  const { t } = useTranslation();

  const reduce = () => {
    handleUpdateQuantity(productId, 'decrease');

    setValue((prevState) => {
      const updatedValue = prevState - 1;
      if (updatedValue === 0) {
        removeProductCallback(productId);
      }
      return updatedValue;
    });
  };

  const increase = (): void => {
    handleUpdateQuantity(productId, 'increase');
    setValue((prevState) => prevState + 1);
  };

  return (
    <div className={classes.quantifierWrapper}>
      <input type="button" value={t('common:minusSign')} className={classes.buttonMinus} onClick={reduce} />
      <input
        type="number"
        name="quantity"
        step="1"
        max=""
        value={value}
        onChange={(e) => setValue(parseInt(e.target.value))}
        className={classes.quantityField}
      />
      <input type="button" value={t('common:plusSign')} className={classes.buttonPlus} onClick={increase} />
    </div>
  );
};
