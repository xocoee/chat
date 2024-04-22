const isProduction = process.env.NODE_ENV === 'production';
const rollbarConfig = {
  enabled: isProduction,
  accessToken: process.env.ROLLBAR_TOKEN,
  captureUncaught: true,
  captureUnhandledRejections: true,
};

export default rollbarConfig;
