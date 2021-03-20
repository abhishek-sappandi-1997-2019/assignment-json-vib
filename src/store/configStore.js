import {createStore , applyMiddleware , combineReducers} from 'redux'
import thunk from 'redux-thunk'
import postsReducer from '../reducers/postsReducer'

const configStore = () => {
    const store = createStore(combineReducers({
        posts : postsReducer
    }) , applyMiddleware(thunk))

    return store
}

export default configStore