import React from "react";
import { useParams } from "react-router-dom";
import Loading from "../Loading/Loading";
import styles from "./Item.module.css";

const Item = ({ products, addToCart }) => {
  const { id } = useParams();
  const product = products.find((item) => item.id.toString() === id);

  if (product) {
    return (
      <section>
        <img
          className={styles.item__img}
          src={product.image}
          alt={product.name}
        />
        <div className={styles.item__title}>{product.name}</div>
        <div className={styles.item__price}>{product.price}</div>
        <button
          className={styles["item__btn--cart"]}
          onClick={() => addToCart(product)}
        >
          장바구니에 담기
        </button>
      </section>
    );
  } else {
    return <Loading />;
  }
};

export default Item;
