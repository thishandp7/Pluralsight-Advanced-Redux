import { take, put, fork, all} from 'redux-saga/effects';
import fetch from 'isomorphic-fetch';

import {
  SET_CART_ITEMS,
  SET_CURRENT_USER,
  setItemPrice
} from '.././actions';

export function* fetchItemPrice(id, country){
  const response = yield fetch(`http://localhost:8081/prices/${country}/${id}`);
  const data = yield response.json();
  yield put(setItemPrice(id,data[0].price));
}

export function* itemPriceSaga(){
  const [{user}, {items}] = yield all([take(SET_CURRENT_USER), take(SET_CART_ITEMS)]);
  yield items.map( item => fork(fetchItemPrice, item.id, user.country));
}
