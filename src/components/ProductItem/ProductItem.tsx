import { useTranslation } from 'react-i18next';

import classes from '@/components/ProductItem/ProductItem.module.scss';
import { Product } from '@/types/models';

interface ProductItemProps {
  product: Product;
  isDisabled: boolean;
  onClick: (product: Product) => void;
}

export const ProductItem = ({ product, isDisabled, onClick }: ProductItemProps) => {
  const { t } = useTranslation();

  return (
    <div className={classes.productItemWrapper} data-testid="product-item">
      <img src={product.thumbnail} alt={product.title} />
      <h3>{product.title}</h3>
      <p>
        {t('products:priceCardLabel', {
          price: t('{{value, currency}}', { value: product.price }),
        })}
      </p>
      <button disabled={isDisabled} onClick={() => onClick(product)}>
        {t('common:add')}
      </button>
    </div>
  );
};
