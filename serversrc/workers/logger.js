function makeLoggerFunction(type) {
  return (...args) => {
    process.send({ log: type, args });
  };
}

const logger = {
  error: makeLoggerFunction('error'),
  warn: makeLoggerFunction('warn'),
  info: makeLoggerFunction('info'),
  verbose: makeLoggerFunction('verbose'),
  debug: makeLoggerFunction('debug'),
  silly: makeLoggerFunction('silly')
};

export default logger;
