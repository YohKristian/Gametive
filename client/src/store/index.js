import { legacy_createStore as createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { eventsReducer, eventDetailReducer } from "./reducers/events";
import { gameReducer } from "./reducers/games";

const store = createStore(
	combineReducers({
		eventsReducer,
		eventDetailReducer,
		gameReducer,
	}),
	applyMiddleware(thunk),
);

export default store;
