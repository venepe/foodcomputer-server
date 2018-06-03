export default {
  mongoUrl: process.env.MONGO_URL || 'mongodb://mongo/babelpack',
  port: process.env.PORT || 8002,
  bucket: process.env.AWS_BUCKET_NAME || 'growfloria',
};
