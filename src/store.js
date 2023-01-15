import { createStore, combineReducers } from 'redux'
import calendarReducer from './state/calendar'


const rootReducer = combineReducers({
    calendar: calendarReducer,
})

export const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)


