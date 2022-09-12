import { FETCH_USER_HISTORY } from "../actions/actionType";

const initialState = {
    history: {},
};

export function usersReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_USER_HISTORY:
            return {
                ...state,
                history: action.payload,
            };
        default:
            return state;
    }
}
