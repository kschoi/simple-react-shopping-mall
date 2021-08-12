import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import products from "./modules/products";
import { composeWithDevTools } from "redux-devtools-extension";

// Node 어플리케이션이 동작하는 시스템의 환경변수를 가져옵니다.
const env = process.env.NODE_ENV;

// store에 적용할 미들웨어를 배열로 정의한다.
const middlewares = [thunk];

// env 변수를 통해 현재 어플리케이션의 상태가 development(개발)일 때만
// redux-logger을 불러오고 어플리케이션의 middleware에 적용한다.
if (env === "development") {
  const { logger } = require("redux-logger");
  middlewares.push(logger);
}

// 플리케이션의 모든 reducer을 combine해준다.
// routing은 프로젝트의 url을 확인할 수 있도록 설정해놓았다. redux-logger에서 확인가능.
const reducer = combineReducers({
  products,
});

let store;

if (env === "development") {
  // 'development' 모드일때에 store을 구분한다.
  // store를 생성할 때의 첫번째 인자는 리듀서, 두번째 인자는 middeware를 적용한다.
  // 이 때, 미리 설치하였던 redux-devtools-extension을 적용하기 위해서 이것을 applyMiddleware에 감쌌다.
  store = (initialState) =>
    createStore(reducer, composeWithDevTools(applyMiddleware(...middlewares)));
} else {
  // 'production' 모드일 때는 store에 Redux Devtools 미들웨어를 적용하지 않는다.
  store = (initialState) =>
    createStore(reducer, applyMiddleware(...middlewares));
}

export default store();
