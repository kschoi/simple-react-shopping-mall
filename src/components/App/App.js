import React, { useState, useMemo, useEffect, useRef } from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import Nav from "../Nav/Nav";
import Cart from "../Cart/Cart";
import Main from "../Main/Main";
import Item from "../Item/Item";
import productsData from "../../MOCK_DATA.json";

const App = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const cartRef = useRef([]);

  const totalAmount = useMemo(
    () =>
      cartRef.current.reduce((prev, item) => {
        if (item.checked) {
          prev += item.price * Number(item.quantity);
        }
        return prev;
      }, 0),
    []
  );

  //장바구니에 선택한 물품 추가
  const handleAddToCart = (product) => {
    setCart((prev) => {
      if (prev.some((item) => item.id === product.id)) {
        let index = prev.findIndex((item) => item.id === product.id);
        prev[index].quantity += 1;
      } else {
        prev.push({ ...product, quantity: 1 });
      }
      return prev;
    });

    // cart가 업데이트되면 local storage에 cart 업데이트하기
    localStorage.cart = JSON.stringify(cart);
  };

  useEffect(() => {
    // 상품 데이터 불러오기
    setProducts(productsData);

    // cart state가 local storage에 있으면 불러오기
    if (localStorage.cart) {
      setCart(JSON.parse(localStorage.cart));
    }
  }, []);

  return (
    <>
      <Nav />
      <main>
        {/* Switch로 Component를 감싸게 되면 처음 매칭되는 Component만을 렌더링하게 된다. */}
        <Switch>
          {/*
           * Route는 임의의 url로 이동할 경우 어떤 Component를 렌더링할지 정해준다.
           * path로 원하는 url, 그리고 렌더링 하길 원하는 Component를 지정한다.
           */}
          <Route exact path="/" render={() => <Main products={products} />} />
          <Route
            exact
            path="/item/:id"
            component={() => (
              <Item products={products} addToCart={handleAddToCart} />
            )}
          />
          <Route
            exact
            path="/cart"
            component={() => <Cart cart={cart} totalAmount={totalAmount} />}
          />
        </Switch>
      </main>
    </>
  );
};

export default App;
