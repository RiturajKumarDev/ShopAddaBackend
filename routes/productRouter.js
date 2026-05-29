const express = require("express");
const productRouter = express.Router();

const { uploadProduct, getProduct, getProducts } = require("../controllers/productController");

productRouter.post("/uploadProduct", uploadProduct);
productRouter.get("/getProduct/:_id", getProduct);
productRouter.get("/getProducts", getProducts);

exports.productRouter = productRouter;
