import React, { useState, useMemo, useEffect } from "react";
import "./App.css";
import { MemoryRouter, Route, Switch } from "react-router-dom";
import Nav from "../Nav/Nav";
import Cart from "../Cart/Cart";
import Main from "../Main/Main";
import Item from "../Item/Item";
import productsData from "../../MOCK_DATA.json";

const App = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  const totalAmount = useMemo(
    () =>
      cart.reduce((prev, item) => {
        if (item.checked) {
          prev += item.price * Number(item.quantity);
        }
        return prev;
      }, 0),
    [cart]
  );

  //장바구니에 이미 제품이 있는지 확인하는 method
  const checkProduct = useMemo(
    (id) => cart.some((item) => item.id === id),
    [cart]
  );

  //장바구니에 선택한 물품을 추가하는 method
  const handleAddToCart = (selectedProducts) => {
    let cartItem = [...cart];
    let productID = selectedProducts.id;
    if (checkProduct(productID)) {
      let index = cartItem.findIndex((item) => item.id === productID);
      cartItem[index].quantity += 1;
    } else {
      cartItem.push({ ...selectedProducts, quantity: 1 });
    }
    setCart(cartItem);
  };

  useEffect(() => {
    // 상품 데이터 불러오기
    setProducts(productsData);

    // cart state가 local storage에 있으면 불러오기
    if (localStorage.cart) {
      setCart(JSON.parse(localStorage.cart));
    }
  }, []);

  // cart가 업데이트되면 local storage에 cart 업데이트하기
  useEffect(() => {
    localStorage.cart = JSON.stringify(cart);
  }, [cart]);

  return (
    <div>
      <Nav />
      {/* Switch로 Component를 감싸게 되면 처음 매칭되는 Component만을 렌더링하게 된다. */}
      <Switch>
        {/* 
        Route는 임의의 url로 이동할 경우 어떤 Component를 렌더링할지 정해준다.
        path로 원하는 url, 그리고 렌더링 하길 원하는 Component를 지정한다.
        */}
        <Route exact path="/" render={() => <Main products={products} />} />
        {products.map((product) => (
          <MemoryRouter
            exact
            key={product.id}
            path={`/item/${product.id}`}
            render={() => (
              <Item
                addToCart={handleAddToCart}
                // productQuantity={product.quantity}
                image={product.image}
                name={product.name}
                price={product.price}
                id={product.id}
              />
            )}
          />
        ))}
        <Route
          exact
          path="/cart"
          render={() => <Cart cart={cart} totalAmount={totalAmount} />}
        />
      </Switch>
    </div>
  );
};

export default App;
