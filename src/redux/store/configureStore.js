import { createStore, applyMiddleware } from 'redux'
import sagaMiddleware from '../middleware'
import rootReducer from '../reducers'
import rootSaga from "../sagas/hello-saga";

export default function configureStore(initialState) {
    const store = createStore(
        rootReducer,
        initialState,
        applyMiddleware(sagaMiddleware)
    )

    sagaMiddleware.run(rootSaga)
    return store
}