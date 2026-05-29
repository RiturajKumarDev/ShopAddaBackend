const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
        userType: { type: String, required: true },
        fullName: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        mobile: { type: String, required: true, unique: true },
        dob: { type: String, required: true },
        gender: { type: String, required: true },
        password: { type: String, required: true },
        joinDate: { type: Date, default: Date.now },
    },
);

module.exports = mongoose.model("User", UserSchema);
