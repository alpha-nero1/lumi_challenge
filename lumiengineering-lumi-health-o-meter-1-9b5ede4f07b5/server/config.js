const config = {
  mongoURL: process.env.MONGO_URL || 'mongodb://localhost:27017/lumi-health-meter',
  port: process.env.PORT || 3333,
};

export default config;
