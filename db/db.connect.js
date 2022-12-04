const mongoose = require("mongoose");
const initialiseDBConnection = async () => {
  try {
    await mongoose.connect(process.env.DB_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log("Connected with DB successfully");
  } catch (err) {
    console.log("Error in establishing DB connection");
    console.log(err);
  }
};
module.exports = {
  initialiseDBConnection,
};
