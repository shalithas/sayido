import mongoose from "mongoose"

export default () => {
    mongoose.connect("mongodb://localhost/sayido", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
      })
      .then(() => console.log("Connected to DB"));
}