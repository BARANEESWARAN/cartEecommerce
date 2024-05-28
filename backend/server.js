const app = require("./app");
const products=require("./routes/products")
const dotenv = require("dotenv");
const path = require("path");
const connectDatabase = require("./config/database");
const errorMiddleware=require("./middleware/error")
dotenv.config({ path: path.join(__dirname, "./config/config.env") });

connectDatabase();
app.use("/api/v1/",products)



app.use(errorMiddleware)
const server=app.listen(process.env.PORT, () => {
  console.log(
    `server listening to the port : ${process.env.PORT} in ${process.env.NODE_ENV}`
  );
});

process.on("unhandledRejection",(err)=>{
    console.log(err.message)
    console.log("shutind down the server due to unhandledRejection")
    server.close(()=>{
        process.exit(1)
    })
})

process.on("uncaughtException",(err)=>{
    console.log(err.message)
    console.log("shutind down the server due to uncaughtException")
    server.close(()=>{
        process.exit(1)
    })
})

