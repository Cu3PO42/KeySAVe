if (process.env.NODE_ENV === 'development') {
  require('babel-register');
}

require('../../init/promisify-fs');
require(process.argv[2]);
