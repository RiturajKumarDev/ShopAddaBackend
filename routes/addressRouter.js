const express = require("express");
const addressRouter = express.Router();

const { uploadAddress, getAddressList, deleteAddress, updateAddress } = require("../controllers/addressController");

addressRouter.post("/uploadAddress", uploadAddress);
addressRouter.post("/updateAddress", updateAddress);
addressRouter.get("/addresses/:userId", getAddressList);
addressRouter.post("/delete/", deleteAddress);

exports.addressRouter = addressRouter;
