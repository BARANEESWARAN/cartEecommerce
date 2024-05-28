const mongoose = require("mongoose");

const connectDatabase = () => {
    const uri = process.env.DATABASE_LOCAL_URI; // Ensure this matches the key in your .env file

    if (!uri) {
      console.error('MongoDB URI is not defined. Please set MONGODB_URI in your environment variables.');
      process.exit(1);
    }


  mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((conn) => {
      console.log(`mongodb connected to host : ${conn.connection.host}`);
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = connectDatabase;
