export default (dotenv) => {
  if (process.env.NODE_ENV !== 'production') {
    dotenv.config();
  }
};
