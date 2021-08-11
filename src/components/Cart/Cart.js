import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import styles from "./Cart.module.css";

const Cart = ({ cart }) => {
  const totalAmount = useMemo(
    () =>
      cart.reduce((prev, item) => {
        //if (item.checked) {
        prev += Number(item.price.slice(1)) * Number(item.quantity);
        //}
        return prev;
      }, 0),
    [cart]
  );

  return (
    <section>
      {cart.length > 0 ? (
        <div className={styles.list}>
          {cart.map((product) => (
            <div className={styles.item} key={product.id}>
              <Link to={`/item/${product.id}`}>
                <img
                  src={product.image}
                  alt={product.name}
                  className={styles.item__image}
                />
              </Link>
              <div className={styles.item__detail}>
                <p className={styles.item__title}>{product.name}</p>
                <p className={styles.item__price}>{product.price}</p>
                <p className={styles.item__quantity}>
                  수량: {product.quantity}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.item__placeholder}>
          장바구니에 담긴 상품이 없습니다.
        </div>
      )}
      <hr />
      결제 예정금액: ${totalAmount}
    </section>
  );
};

export default Cart;
