import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from "redux";
import thunk from "redux-thunk";
import { eventsReducer, eventDetailReducer } from "./reducers/events";
import { gameReducer } from "./reducers/games";
import { teamsReducer } from "./reducers/teams";

const store = createStore(
  combineReducers({
    eventsReducer,
    eventDetailReducer,
    gameReducer,
    teamsReducer,
  }),
  applyMiddleware(thunk)
);

export default store;
