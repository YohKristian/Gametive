import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from "redux";
import thunk from "redux-thunk";
import { eventsReducer, eventDetailReducer } from "./reducers/events";
import { gameReducer } from "./reducers/games";
import { teamsReducer } from "./reducers/teams";
import { usersReducer } from "./reducers/users";

const store = createStore(
  combineReducers({
    eventsReducer,
    eventDetailReducer,
    gameReducer,
    teamsReducer,
    usersReducer,
  }),
  applyMiddleware(thunk)
);

export default store;
