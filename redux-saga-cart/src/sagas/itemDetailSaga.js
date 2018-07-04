import { take, put, fork } from 'redux-saga/effects';
import fetch from 'isomorphic-fetch';
const HOST = process.env.HOST;
import {
  SET_CART_ITEMS,
  setItemDetails
} from '.././actions';

export function* loadItemDetails(item){
  const { id } = item;
  const responce = yield fetch(`http://${HOST}:8081/items/${id}`);
  const data = yield responce.json();
  yield put(setItemDetails(data[0]));
}

export function* itemDetailSaga(){
  const { items } = yield take(SET_CART_ITEMS);
  yield items.map(item => fork(loadItemDetails, item));

}
