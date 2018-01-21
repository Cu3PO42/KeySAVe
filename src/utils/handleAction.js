export function handleAction(type, handler, initialState) {
  const handleSuccess = typeof handler.success === 'function' ? handler.sucess : handler;
  const handleError = typeof handler.error === 'function' ? handler.error : handler;

  return function handle(state = initialState, action) {
    switch (action.type) {
      case type:
        return (action.error ? handleError : handleSuccess)(state, action);
      default:
        return state;
    }
  };
}

export function handleActions(handlerMap, initialState) {
  const normalizedHandler = {};
  for (const actionType in handlerMap) {
    if (handlerMap.hasOwnProperty(actionType)) {
      const handler = handlerMap[actionType];
      const handleSuccess = typeof handler.success === 'function' ? handler.success : handler;
      const handleError = typeof handler.error === 'function' ? handler.error : handler;
      normalizedHandler[actionType] = {
        success: handleSuccess,
        error: handleError,
      };
    }
  }

  return function handle(state = initialState, action) {
    const handler = normalizedHandler[action.type];
    if (handler) {
      return (action.error ? handler.error : handler.success)(state, action);
    }

    return state;
  };
}
