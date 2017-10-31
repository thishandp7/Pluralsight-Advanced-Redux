import { take, put } from 'redux-saga/effects';
import fetch from 'isomorphic-fetch';

import{
  SET_CURRENT_USER,
  setCartItems
} from '.././actions';

export function* fetchCartSaga(){
  const {user} = yield take(SET_CURRENT_USER);
  const responce = yield fetch(`http://localhost:8081/cart/${user.id}`);
  const { items } = yield responce.json();
  yield put(setCartItems(items));
}
