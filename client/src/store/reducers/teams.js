const initialState = {
  teams: [],
};

export function teamsReducer(state = initialState, action) {
  switch (action.type) {
    case "teams/fetchSuccess":
      return {
        ...state,
        teams: action.payload,
      };
    case "teams/createSuccess":
      return true;
    default:
      return state;
  }
}
