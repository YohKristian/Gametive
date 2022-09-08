import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from "redux";
import thunk from "redux-thunk";
import { baseUrl } from "./reducers";

const store = createStore(combineReducers({ baseUrl }), applyMiddleware(thunk));

export default store;
