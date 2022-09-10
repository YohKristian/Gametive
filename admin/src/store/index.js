import{legacy_createStore as createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers/rootReducer'

let store= createStore(rootReducer, applyMiddleware(thunk))

export default store