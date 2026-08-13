const express = require("express");
const authRouter = express.Router();

const { register, login, getUser, updateUser, changePassword } = require("../controllers/authController");

authRouter.post("/register", register);
authRouter.put("/update/:_id", updateUser);
authRouter.post("/login", login);
authRouter.get("/getUser/:_id", getUser);
authRouter.put("/change-password/:_id", changePassword);

exports.authRouter = authRouter;
