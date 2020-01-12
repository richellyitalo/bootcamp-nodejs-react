import { call, put, all, takeLatest } from 'redux-saga/effects';

import api from '../../../services/api';
import { addToCartSuccess } from './actions';

function* addToCartRequest(action) {
  const response = yield call(api.get, `products/${action.id}`);

  yield put(addToCartSuccess(response.data));
}

export default all([takeLatest('@cart/ADD_REQUEST', addToCartRequest)]);
