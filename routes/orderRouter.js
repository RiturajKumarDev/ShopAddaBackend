const express = require("express");
const orderRouter = express.Router();

const { saveOrder, orderList } = require("../controllers/orderController");

orderRouter.post("/save-order", saveOrder);
orderRouter.get("/orderList/:userId", orderList);

exports.orderRouter = orderRouter;
