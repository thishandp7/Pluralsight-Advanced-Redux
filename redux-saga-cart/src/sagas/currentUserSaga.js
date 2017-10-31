import { take, call, put, apply } from 'redux-saga/effects';
import fetch from 'isomorphic-fetch';
import {
  setCurrentUser,
  GET_CURRENT_USER_INFO
} from '.././actions'

export function* currentUserSaga(){
  const { id } = yield take(GET_CURRENT_USER_INFO);
  const responce = yield call(fetch, `http://localhost:8081/user/${id}`);
  const data = yield apply(responce, responce.json);
  yield put(setCurrentUser(data));
}
