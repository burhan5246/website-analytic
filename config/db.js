const mongoose = require("mongoose");
const connecDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://admin:admin@123456@website-analytic.ada2b.mongodb.net/website-analytic?retryWrites=true&w=majority", {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
    console.log("mongoDB connected...");
  } catch (err) {
    console.error(err.message);
    //exit process with failure
    process.exit(1);
  }
};

module.exports = connecDB;