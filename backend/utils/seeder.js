const connectDatabase = require("../config/database")
const Product=require("../data/product.json")
const Products=require("../models/productModel.js")
const dotenv=require("dotenv")
const path=require("path")
dotenv.config({path:path.join(__dirname,"../config/config.env")})
connectDatabase()

const seeder =async()=>{
try{

    await Products.deleteMany()
    console.log("product deleted")
    await Products.insertMany(Product)
    console.log("product inserted")


}
catch(err){
console.log(err.message)
}

process.exit()
}

seeder()


