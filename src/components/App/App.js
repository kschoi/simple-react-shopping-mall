import React from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import Nav from "../Nav/Nav";
import Cart from "../Cart/Cart";
import Main from "../Main/Main";
import Item from "../Item/Item";
import products from "../../MOCK_DATA.json";

const App = () => {
  return (
    <div>
      <Nav />
      {/* Switch로 Component를 감싸게 되면 처음 매칭되는 Component만을 렌더링하게 된다. */}
      <Switch>
        {/* 
        Route는 임의의 url로 이동할 경우 어떤 Component를 렌더링할지 정해준다.
        path로 원하는 url, 그리고 렌더링 하길 원하는 Component를 지정한다.
        */}
        <Route
          exact
          path="/"
          render={(props) => {
            return <Main products={products} />;
          }}
        />
        {products.map((product) => (
          <Route
            exact
            path={`/item/${product.id}`}
            render={(props) => {
              return (
                <Item
                  image={product.image}
                  name={product.name}
                  price={product.price}
                  id={product.id}
                  key={product.id}
                />
              );
            }}
          />
        ))}
        <Route exact path="/cart" component={Cart} />
      </Switch>
    </div>
  );
};

export default App;
