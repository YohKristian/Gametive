import { FETCH_DETAIL_TEAM } from "../actions/actionType";

const initialState = {
  teams: [],
  detailTeam: {}
};

export function teamsReducer(state = initialState, action) {
  switch (action.type) {
    case "teams/fetchSuccess":
      return {
        ...state,
        teams: action.payload,
      };
    case FETCH_DETAIL_TEAM:
      return {
        ...state,
        detailTeam: action.payload
      };
    default:
      return state;
  }
}
