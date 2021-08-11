import React from "react";
import styles from "./Cart.module.css";

const Cart = ({ cart }) => {
  return (
    <div>
      {cart.map((item) => (
        <div className="itemContainer" key={item.id}>
          <img src={item.image} alt={item.name} />
          {item.name}
        </div>
      ))}
    </div>
  );
};

export default Cart;
