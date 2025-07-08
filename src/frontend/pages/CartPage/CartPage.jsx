import { Link } from 'react-router-dom';
import { CartProductCard, Price, Title } from '../../components';
import EmptyList from '../../components/EmptyList/EmptyList';
import styles from './CartPage.module.css';
import { useAllProductsContext } from '../../contexts/ProductsContextProvider';
import { toastHandler } from '../../utils/utils';
import { ToastType } from '../../constants/constants';

const CartPage = () => {
  const {
    cart: cartFromContext,
    clearCartDispatch,
    cartDetails: { totalCount, totalAmount },
  } = useAllProductsContext();

  const handleClearCart = () => {
    clearCartDispatch();
    toastHandler(ToastType.Success, 'Carrito limpiado exitosamente');
  };

  if (cartFromContext.length < 1) {
    return <EmptyList listName='carrito' />;
  }

  return (
    <main className={`full-page ${styles.cartListPage}`}>
      <Title>Carrito ({cartFromContext.length})</Title>

      <div className={`container ${styles.cartCenter}`}>
        <section className={styles.cartListContainer}>
          {cartFromContext.map((singleCartItem) => (
            <CartProductCard
              key={singleCartItem._id}
              singleCartItem={singleCartItem}
            />
          ))}
          {/* made a api in cart controller for this functionality. */}
          <button
            className='btn btn-danger btn-padding-desktop btn-center mt-2'
            onClick={handleClearCart}
          >
            Limpiar Carrito
          </button>
        </section>

        {/* this will come from cartContext */}
        <article className={styles.checkout}>
          <h3 className='text-center'>Detalles del Precio del Carrito</h3>
          <hr />

          <div className={styles.detailsContainer}>
            {cartFromContext.map(
              ({ _id, name, qty, price, colors: [{ color }] }) => (
                <article key={_id} className={styles.row}>
                  <span>
                    {name}{' '}
                    <span
                      className={styles.colorCircle}
                      style={{ background: color }}
                    ></span>
                    ({qty})
                  </span>
                  <Price amount={price * qty} />
                </article>
              )
            )}
          </div>

          <hr />
          <article className={`${styles.row} ${styles.totalPrice}`}>
            <span>Precio Total ({totalCount}):</span>
            <Price amount={totalAmount} />
          </article>

          <Link to='/checkout' className='btn text-center btn-width-100'>
            Finalizar Compra
          </Link>
        </article>
      </div>
    </main>
  );
};

export default CartPage;