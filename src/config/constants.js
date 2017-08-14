const devConfig = {
  MONGO_URL: 'mongodb://localhost/tourny-maker-dev',
  JWT_SECRET: 'aSecretKey',
};

const testConfig = {
  MONGO_URL: 'mongodb://localhost/tourny-maker-test',
};

const prodConfig = {
  MONGO_URL:
    'mongodb://alvaro911:Password1@ds141118.mlab.com:41118/tournaments',
  JWT_SECRET: 'iWannaRock',
};

const defaultConfig = {
  PORT: process.env.PORT || 8080,
};

function envConfig(env) {
  switch (env) {
    case 'development':
      return devConfig;
    case 'test':
      return testConfig;
    default:
      return prodConfig;
  }
}

export default {
  ...defaultConfig,
  ...envConfig(process.env.NODE_ENV),
};
