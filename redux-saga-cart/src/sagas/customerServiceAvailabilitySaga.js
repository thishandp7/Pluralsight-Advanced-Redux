import { take, put } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import { connect } from '../createSocketConnection';

import {
  setCustomerServiceAvailability
} from '.././actions';

export function* customerServiceAvailabilitySaga(){
  const socket = connect();
  const chan = yield eventChannel( emit => {
    const enabelSupportMessage = () => {
      emit (true);
    }
    const disableSupportMessage = () => {
      emit (false);
    }

    socket.on(`SUPPORT_AVAILABLE`, enabelSupportMessage);
    socket.on(`SUPPORT_NOT_AVAILABLE`, disableSupportMessage);

    return () => {

    }

  });

  while(true){
    const supportAvailability = yield take(chan);
    yield put(setCustomerServiceAvailability(supportAvailability));
  }
}
