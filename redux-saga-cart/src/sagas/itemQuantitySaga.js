import { takeLatest, put, call, select } from 'redux-saga/effects';
import fetch from 'isomorphic-fetch';

import {
  increaseItemQuantity,
  decreaseItemQuantity,
  INCREASE_ITEM_QUANTITY,
  DECREASE_ITEM_QUANTITY,
  FETCHED,
  FETCHING,
  setItemQuantityFetchStatus
} from '.././actions';

import { currentUserSelector } from '.././selectors';

const HOST = process.env.HOST || localhost;

export function* handleIncreaseItemQuantity({id}){
  yield put(setItemQuantityFetchStatus(FETCHING));
  const user = yield select(currentUserSelector);
  const responce = yield fetch(`http://${HOST}:8081/cart/add/${user.get('id')}/${id}`);

  if(responce.status !== 200){
    yield put(decreaseItemQuantity(id, true));
    alert('Sorry, We don\'t have enough stocks');
  }
  yield put(setItemQuantityFetchStatus(FETCHED));
}

export function* handleDecreaseItemQuantity({id, local}){
  if(local){
    return
  }
  yield put(setItemQuantityFetchStatus(FETCHING));
  const user = yield select(currentUserSelector);
  const responce = yield fetch(`http://${HOST}:8081/cart/remove/${user.get('id')}/${id}`);
  if(responce.status !== 200){
    console.warn('received non-200 status:: ', responce);
  }
  yield put(setItemQuantityFetchStatus(FETCHED));
}

export function* itemQuantitySaga(){
  yield [
    takeLatest(INCREASE_ITEM_QUANTITY, handleIncreaseItemQuantity),
    takeLatest(DECREASE_ITEM_QUANTITY, handleDecreaseItemQuantity)
  ]
}
