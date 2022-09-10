import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from "redux";
import thunk from "redux-thunk";
import { baseUrl, eventsReducer } from "./reducers";

const store = createStore(combineReducers({ baseUrl, eventsReducer }), applyMiddleware(thunk));

export default store;
