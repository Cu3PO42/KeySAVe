function id(e) {
  return e;
}

export default function createAction(type, payloadProvider = id) {
  return function action(...args) {
    const payload = payloadProvider(...args);
    return {
      type,
      payload,
      error: payload instanceof Error
    };
  };
}
