const express = require("express");
const paymentRouter = express.Router();

const { createOrder, paymentSuccess } = require("../controllers/paymentController");

paymentRouter.post("/success", paymentSuccess);
paymentRouter.post("/create-order", createOrder);

exports.paymentRouter = paymentRouter;
