import { FETCH_ALL_EVENT, FETCH_ALL_PROVINCE, FETCH_ALL_REGENCY, FETCH_DETAIL_EVENT } from "../action/actionType"

let initialState = {
    event: {},
    detailEvent: [],
    province: [],
    regencies:[]
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
        case FETCH_ALL_PROVINCE:
            return{
                ...state,
                province: action.payload
            }
        case FETCH_ALL_REGENCY:
            return{
                ...state,
                regencies: action.payload
                }
        default:
            return state
    }
}


export default eventReducer