import classes from '@/components/CartItem/CartItem.module.scss';
import { Quantifier } from '@/components/Quantifier/index.ts';
import { CartOperation, Product } from '@/types/models';

interface CartItemProps {
  product: Product;
  onRemoveItem: (productId: Product['id']) => void;
  onUpdate: (productId: Product['id'], operation: CartOperation) => void;
}

export const CartItem = ({ product, onRemoveItem, onUpdate }: CartItemProps) => {
  return (
    <div className={classes.cartItemWrapper} data-testid="cart-item" key={product.id}>
      <img src={product.thumbnail} alt={product.title} />
      <h3>{product.title}</h3>
      <Quantifier
        removeProductCallback={() => onRemoveItem(product.id)}
        productId={product.id}
        handleUpdateQuantity={onUpdate}
      />
    </div>
  );
};
