import { FETCH_ALL_USER, FETCH_DETAIL_USER } from "../action/actionType"

let initialState = {
    user: {},
    detailUser: []
}

function userReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_ALL_USER:
            return {
                ...state,
                user: action.payload
            }
        case FETCH_DETAIL_USER:
            return {
                ...state,
                detailUser: action.payload
            }
        default:
            return state
    }
}


export default userReducer