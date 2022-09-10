import { combineReducers } from "redux";

import eventReducer from './eventReducer'
import userReducer from './userReducer'
import gameReducer from "./gameReducer"

const rootReducer= combineReducers({
    event: eventReducer,
    user: userReducer,
    game: gameReducer
})

export default rootReducer