import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";

export function actionCreatorFactory(...types) {
  return types.reduce((actions, type) => {
    actions[type] = payload => ({ type, payload });
    return actions;
  }, {});
}

export function createReducer(initialState, handlers) {
  return (state = initialState, action) => {
    const handler = handlers[action.type];
    const partialUpdate = handler && handler(state, action);
    if (!partialUpdate) return state;
    else return { ...state, ...partialUpdate };
  };
}

export function initializeStore(reducer, saga) {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(reducer, applyMiddleware(sagaMiddleware));
  sagaMiddleware.run(saga);
  return store;
}
