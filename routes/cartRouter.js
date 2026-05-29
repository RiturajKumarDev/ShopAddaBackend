const express = require("express");
const cartRouter = express.Router();

const { addToCart, removeFromCart, getCartListProducts } = require("../controllers/cartController");

cartRouter.post("/addToCart", addToCart);
cartRouter.post("/removeFromCart", removeFromCart);
cartRouter.get("/cartListProducts/:userId", getCartListProducts);

exports.cartRouter = cartRouter;
