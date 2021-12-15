import { all, fork } from "redux-saga/effects";
import * as userSaga from "./userSaga.js";
import * as chatSaga from "./chatSaga.js";

export default function* rootSaga() {
    yield all([...Object.values(userSaga), ...Object.values(chatSaga)].map(fork));
}
