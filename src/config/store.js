import { createStore, applyMiddleware, compose, combineReducers } from 'redux'

import rootReducer from './rootReducer'

const configureStore = (apolloClient, initialState) => {

    const middleware = [ ]
    const createStoreWithMiddleware = compose(
        applyMiddleware(...middleware),
        window.devToolsExtension ? window.devToolsExtension() : f => f
    )(createStore)


    const store = createStoreWithMiddleware(combineReducers({
        debug: rootReducer,
        apollo: apolloClient.reducer(),
    }), initialState)

    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('./rootReducer', () => {
            const nextRootReducer = require('./rootReducer').default
            store.replaceReducer(nextRootReducer)
        })
    }

    return store
}


export default configureStore
