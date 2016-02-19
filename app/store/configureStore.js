var config;
if (process.env.NODE_ENV === 'production') {
  config = require('./configureStore.production').default;
} else {
  config = require('./configureStore.development').default;
}
export default config;
