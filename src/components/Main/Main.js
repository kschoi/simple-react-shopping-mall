import React from "react";
import { Link } from "react-router-dom";

const Main = (props) => {
  // 실제 project에서는 fetch로 불러온 product는 길이가 0이하이거나, 어떠한 오류로 아무것도 렌더링 하지 않을수도 있다.
  // 이를 대비해 if문을 사용하여 렌더링할 컴포넌트를 분기할 수 있다.
  if (props.products) {
    return <RenderProducts products={props.products} />;
  } else {
    return <RenderLoading />;
  }
};

const RenderProducts = (props) => {
  return props.products.map((product) => {
    return (
      <div className="product">
        <Link className="productImg" to={`/item/${product.id}`}>
          <img src={product.image} alt="food" />
        </Link>
        <div className="productName">
          <p className="productTitle">{product.name}</p>
        </div>
        <hr />
        <p className="productPrice">{product.price.toLocaleString()} 원</p>
      </div>
    );
  });
};

const RenderLoading = (props) => <div>Loading...</div>;

export default Main;
