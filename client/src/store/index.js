import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from "redux";
import thunk from "redux-thunk";
import { eventsReducer, eventDetailReducer } from "./reducers/events";

const store = createStore(
  combineReducers({
    eventsReducer,
    eventDetailReducer,
  }),
  applyMiddleware(thunk)
);

export default store;
