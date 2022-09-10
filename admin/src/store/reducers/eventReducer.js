import { FETCH_ALL_EVENT, FETCH_DETAIL_EVENT } from "../action/actionType"

let initialState = {
    event: [],
    detailEvent: []
}

function eventReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_ALL_EVENT:
            return {
                ...state,
                event: action.payload
            }
        case FETCH_DETAIL_EVENT:
            return {
                ...state,
                detailEvent: action.payload
            }
        default:
            return state
    }
}


export default eventReducer