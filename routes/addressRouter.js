const express = require("express");
const addressRouter = express.Router();

const { uploadAddress, getAddressList, deleteAddress, updateAddress } = require("../controllers/addressController");

addressRouter.post("/uploadAddress", uploadAddress);
addressRouter.put("/updateAddress", updateAddress);
addressRouter.get("/addresses/:userId", getAddressList);
addressRouter.delete("/delete/", deleteAddress);

exports.addressRouter = addressRouter;
