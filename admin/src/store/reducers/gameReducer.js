import { FETCH_ALL_GAME, FETCH_DETAIL_GAME } from "../action/actionType"

let initialState = {
  game: {},
  detailGame: {}
}

function gameReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_ALL_GAME:
      return {
        ...state,
        game: action.payload
      }
    case FETCH_DETAIL_GAME:
      return {
        ...state,
        detailGame: action.payload
      }
    default:
      return state
  }
}


export default gameReducer