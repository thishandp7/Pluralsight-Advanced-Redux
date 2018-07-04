import { take, put } from 'redux-saga/effects';
import fetch from 'isomorphic-fetch';

import {
  SET_CURRENT_USER,
  setTaxRate
} from '.././actions';

const HOST = process.env.HOST;

export function* taxRateSaga(){
  const { user } = yield take(SET_CURRENT_USER);
  const { country } = user;
  const response = yield fetch(`http://${HOST}:8081/tax/${user.country}`);
  const {rate} = yield response.json();
  yield put(setTaxRate(rate));
}
