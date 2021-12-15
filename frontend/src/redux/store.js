import { createStore, compose, applyMiddleware } from "redux";
import rootReducer from "../redux/reducers";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./sagas/index.js";

const sagaMiddleware = createSagaMiddleware();

const store = compose(
    applyMiddleware(sagaMiddleware),
    typeof window.__REDUX_DEVTOOLS_EXTENSION__ === "undefined"
        ? (a) => a
        : window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)(createStore)(rootReducer);

sagaMiddleware.run(rootSaga);

export default store;
