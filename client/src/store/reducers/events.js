const initialState = {
  events: "",
};

export function eventsReducer(state = initialState, action) {
  switch (action.type) {
    case "events/fetchSuccess":
      return {
        ...state,
        events: action.payload,
      };

    default:
      return state;
  }
}

export function eventDetailReducer(state = {}, action) {
  switch (action.type) {
    case "eventDetail/fetchSuccess":
      return action.payload;
    default:
      return state;
  }
}

