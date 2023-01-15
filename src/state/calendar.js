export const LOAD = 'calendar/LOAD'
export const ADD = 'calendar/ADD'
export const DELETE = 'calendar/DELETE'


export const loadMeetingsAction = (data) => ({
  type: LOAD,
  payload: { data }
})
export const saveMeetingsAction = (data) => ({
  type: ADD,
  payload: { data }
})
export const deleteMeetingsAction = (id) => ({
  type: DELETE,
  payload: { id }
})

const initialState = {
  meetings: [],
}

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD:
      return {
        ...state, meetings: action.payload.data
      }
    case ADD:
      return {
        ...state,
        meetings: state.meetings.concat(action.payload.data)
      }
    case DELETE:
      return {
        ...state,
        meetings: state.meetings.filter(({ id }) => id !== action.payload.id)
      }
    default:
      return state
  }
}

export default reducer