import { call, put, takeLatest } from "redux-saga/effects";

import dataService from "../common/data-service";
import { actionCreatorFactory, createReducer } from "../lib/utils/interactor";

const REQUEST_APPOINTMENTS = "REQUEST_APPOINTMENTS";
const RECEIVED_APPOINTMENTS = "RECEIVED_APPOINTMENTS";

const initialState = { appointments: [], isBusy: false };

export const conferenceRoom = createReducer(initialState, {
  [RECEIVED_APPOINTMENTS]: (_, payload) => ({
    appointments: payload,
    isBusy: false
  }),
  [REQUEST_APPOINTMENTS]: () => ({ isBusy: true })
});

// external action creators to be dispatched by our views
export const commands = actionCreatorFactory(REQUEST_APPOINTMENTS);

// action creators that are only meant to be dispatched internally
const events = actionCreatorFactory(RECEIVED_APPOINTMENTS);

export function* saga() {
  yield takeLatest(REQUEST_APPOINTMENTS, onRequestAppointments);
}

function* onRequestAppointments({ payload }) {
  const appointments = yield call(dataService.fetchAppointments, payload);
  yield put(events[RECEIVED_APPOINTMENTS](appointments));
}
