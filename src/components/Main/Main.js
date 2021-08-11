import React from "react";
import { Link } from "react-router-dom";
import Loading from "../Loading/Loading";
import styles from "./Main.module.css";

const Main = ({ products }) => {
  // 실제 project에서는 fetch로 불러온 product는 길이가 0이하이거나, 어떠한 오류로 아무것도 렌더링 하지 않을수도 있다.
  // 이를 대비해 if문을 사용하여 렌더링할 컴포넌트를 분기할 수 있다.
  return (
    <div className={styles.product__List}>
      {products.length > 0 ? (
        products.map((product) => {
          return (
            <div className={styles.product__item} key={product.id}>
              <Link to={`/item/${product.id}`}>
                <img
                  loading="lazy"
                  src={product.image}
                  alt={product.name}
                  className={styles.product__img}
                />
              </Link>
              <div className={styles.product__detail}>
                <Link to={`/item/${product.id}`}>
                  <p className={styles.product__title}>{product.name}</p>
                </Link>
                <p className={styles.product__price}>
                  {product.price.toLocaleString()} 원
                </p>
              </div>
            </div>
          );
        })
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default Main;
