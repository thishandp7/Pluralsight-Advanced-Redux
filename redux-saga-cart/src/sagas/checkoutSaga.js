import { call, put, take, select} from 'redux-saga/effects';
import fetch from 'isomorphic-fetch';
const HOST = process.env.HOST || localhost;

import {
  ERROR_CHECKOUT_PHASE,
  QUANTITY_VERIFICATION_CHECKOUT_PHASE,
  CREDIT_VALIDATION_CHECKOUT_PHASE,
  PURCHASE_FINALIZATION_CHECKOUT_PHASE,
  SUCCESS_CHECKOUT_PHASE,
  TOGGLE_CHECKING_OUT,
  setCheckoutPhase
} from '.././actions';

import {
  currentUserSelector
} from '.././selectors';

export function* validateCart(user){
  const uid = user.get('id');
  const responce = yield fetch(`http://${HOST}:8081/cart/validate/${uid}`);
  const { validated } = yield responce.json();
  return validated;
}

export function* validateCard(user){
  const response = yield call(fetch, `http://${HOST}:8081/card/validate/${user.get('id')}`);
  const { validated } = yield response.json();
  return validated;
}

export function* executePurchase(user){
  const response = yield fetch(`http://${HOST}:8081/card/charge/${user.get('id')}`);
  const {success} = yield response.json();
  console.log(success);
  return success;
}

export function* checkout(){
  const user = yield select(currentUserSelector);
  yield put(setCheckoutPhase(QUANTITY_VERIFICATION_CHECKOUT_PHASE));
  const cartValidate = yield call(validateCart, user);
  if(!cartValidate){
    yield put(setCheckoutPhase(ERROR_CHECKOUT_PHASE));
    return;
  }

  yield put(setCheckoutPhase(CREDIT_VALIDATION_CHECKOUT_PHASE));
  const creditValidate = yield call(validateCard, user);
  if(!creditValidate){
    yield put(setCheckoutPhase(ERROR_CHECKOUT_PHASE));
    return;
  }

  yield put(setCheckoutPhase(PURCHASE_FINALIZATION_CHECKOUT_PHASE));
  const purchaseSuccessful = yield call(executePurchase, user);

  if(!purchaseSuccessful){
    yield put(setCheckoutPhase(ERROR_CHECKOUT_PHASE));
    return;
  }

  yield put(setCheckoutPhase(SUCCESS_CHECKOUT_PHASE));
}

export function* checkoutSaga() {
  while(true){
    const isCheckingOut = yield take(TOGGLE_CHECKING_OUT);
    if(isCheckingOut){
      yield call(checkout);
    }
  }
}
