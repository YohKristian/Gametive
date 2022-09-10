export const baseUrl = () => {
  return "http://localhost:3000"
}

const initialState = {
  events: []
}

export function eventsReducer(state = initialState, action) {
  switch (action.type) {
    case 'events/fetchSuccess':
      return {
        ...state,
        events: action.payload
      }

    default:
      return state;
  }
}