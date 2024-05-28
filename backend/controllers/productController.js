const Product = require("../models/productModel");
const ErrorHandler=require("../utils/errorHandler")
const CatchAsyncError=require("../middleware/catchAsyncError")
const ApiFeatures=require("../utils/apiFeatures")
// Get all Product(GET) -/api/v1/products
exports.getProducts =CatchAsyncError(  async (req, res, next) => {

  const resultPerPage =2;
    const apiFeatures = new ApiFeatures(Product.find(), req.query).search().filter().paginate(resultPerPage);
    const products = await apiFeatures.query;

    res.status(200).json({
      success: true,
      count: products.length,
      products,
    })
  })

// create Product -/api/v1/products/new
exports.newProduct =CatchAsyncError( async (req, res, next) => {
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
})

// Get Single Product(GET) -/api/v1/product/:id

exports.getSingleProduct = async (req, res, next) => {
    try {
      const product = await Product.findById(req.params.id);
  
      if (!product) {
        return next(new ErrorHandler('Product not found', 400));
      }
  
      res.status(200).json({ success: true, product });
    } catch (err) {
      next(err);
    }
  };

// Update Product(PUT) -/api/v1/product/:id

exports.updateProduct = async (req, res, next) => {
  try {
    let product = await Product.findById(req.params.id);
    if (!product) {
      return res
        .status(404)
        .json({ success: "false", message: "Product not found" });
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      product,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "server error",
    });
  }
};


// DELETE Product(DELETE) -/api/v1/product/:id

exports.deleteProduct = async (req, res, next) => {
    try {
      let product = await Product.findById(req.params.id);
      if (!product) {
        // return res
        //   .status(404)
        //   .json({ success: "false", message: "Product not found" });

        return next(new ErrorHandler("product not found",404))
      }
  
    await Product.findByIdAndDelete(req.params.id)
  
      res.status(200).json({
        success: true,
        message:"product deleted!",
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        success: false,
        message: "server error",
      });
    }
  };
