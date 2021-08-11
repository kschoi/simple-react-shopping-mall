import React from "react";
import { useParams } from "react-router-dom";
import Loading from "../Loading/Loading";

const Item = ({ products, addToCart }) => {
  const { id } = useParams();
  const product = products.find((item) => item.id.toString() === id);

  if (product) {
    return (
      <div className="container">
        <img className="itemImage" src={product.image} alt={product.name} />
        item
        {product.name}
        <div className="itemPrice">{product.price}</div>
        <button color="primary" onClick={() => addToCart(product)}>
          장바구니에 담기
        </button>
      </div>
    );
  } else {
    return <Loading />;
  }
};

export default Item;
