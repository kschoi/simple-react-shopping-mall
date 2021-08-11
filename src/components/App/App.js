import React, { useState, useEffect } from "react";
import "./App.css";
import { Route, Switch, useHistory } from "react-router-dom";
import Nav from "../Nav/Nav";
import Cart from "../Cart/Cart";
import Main from "../Main/Main";
import Item from "../Item/Item";
import productsData from "../../MOCK_DATA.json";

const App = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const history = useHistory();

  //장바구니에 선택한 물품 추가
  const handleAddToCart = (product) => {
    setCart((prev) => {
      const items = [...prev];
      if (items.some((item) => item.id === product.id)) {
        let index = items.findIndex((item) => item.id === product.id);
        items[index].quantity += 1;
      } else {
        items.push({ ...product, quantity: 1 });
      }
      return items;
    });

    // cart가 업데이트되면 local storage에 cart 업데이트하기
    localStorage.cart = JSON.stringify(cart);

    // 장바구니로 이동하기
    history.push("/cart");
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
      <Nav cartCount={cart.length} />
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
          <Route exact path="/cart" component={() => <Cart cart={cart} />} />
        </Switch>
      </main>
    </>
  );
};

export default App;
