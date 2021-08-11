// React의 Component를 생성하기 위해서는 우선 React Library를 불러온다.
import React from "react";
// React-Router에서 Routing기능을 생성하기 위해, 내장 Component인 Link Component를 불러온다.
import { Link } from "react-router-dom";
// css module을 불러온다.
import styles from "./Nav.module.css";

// es6의 형태로 작성된 stateless functional component, 혹은 dumb component라고 한다.
// Class Component처럼 render함수, Javascript의 this등을 사용하지 않고 좀 더 간단히 작성할 수 있다.
const Nav = ({ cartCount }) => (
  <nav className={styles.navbar}>
    {/* Link를 사용하면 전체 페이지의 reloading을 막을 수 있게 된다. */}
    <Link to="/">
      <span className={styles.text}>메인</span>
    </Link>
    <Link to="/cart">
      <span className={styles.text}>
        장바구니
        {cartCount > 0 && <span className={styles.count}>{cartCount}</span>}
      </span>
    </Link>
  </nav>
);

export default Nav;
