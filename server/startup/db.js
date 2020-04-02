import mongoose from "mongoose"
import logger from "../logger/logger";

export default () => {
    mongoose.connect("mongodb://localhost/sayido", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
      })
      .then(() => logger.info('Connected to DB'));
}