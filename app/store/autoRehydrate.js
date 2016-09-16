function wrapReducer(reducer) {
  return (state, action) => {
    if (action.type !== 'REHYDRATE') {
      return reducer(state, action);
    }

    const nextState = reducer(state, action);

    if (state === nextState) {
      const { reducer, state: hydrationState } = action.payload;
      const reducerState = state[reducer];
      const nextReducerState = {
        ...reducerState,
        ...hydrationState
      };
      return {
        ...state,
        [reducer]: nextReducerState
      };
    }

    return nextState;
  };
}

export default function autoRehydrate() {
  return (createStore) => (reducer, preloadedState, enhancer) =>
    createStore(wrapReducer(reducer), preloadedState, enhancer);
}
