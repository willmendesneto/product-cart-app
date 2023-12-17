import { useTranslation } from 'react-i18next';

import { Loader } from '@/components/Loader';
import { ProductItem } from '@/components/ProductItem/ProductItem';
import classes from '@/pages/Products/Products.module.scss';
import { useGetProducts } from '@/queries/products';
import { Product } from '@/types/models';
import { useCartStorage } from '@/utils/storage';

export const Products = () => {
  const [cart, setCart] = useCartStorage();
  const { t } = useTranslation();

  const { data, isLoading, isError } = useGetProducts();

  const onAddToCartClick = (product: Product): void => {
    setCart((prevCart) => ({
      ...prevCart,
      [product.id]: { ...product, quantity: 1 },
    }));
  };

  const isProductAlreadyACartItem = (productId: number) => Object.keys(cart || {}).includes(productId.toString());

  if (isError) {
    return <h3 className={classes.error}>{t('products:apiError')}</h3>;
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <section className={classes.productSection}>
      <h1>{t('products:productsPageTitle')}</h1>

      <div className={classes.productSectionWrapper}>
        {Array.isArray(data?.products) && data.products.length > 0 ? (
          data.products.map((product) => (
            <ProductItem
              key={product.id}
              product={product}
              isDisabled={isProductAlreadyACartItem(product.id)}
              onClick={() => onAddToCartClick(product)}
            />
          ))
        ) : (
          <p>{t('products:noProductsFound')}</p>
        )}
      </div>
    </section>
  );
};
