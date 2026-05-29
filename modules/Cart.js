const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            require: true,
            unique: true
        },
        addDate: { type: Date, default: Date.now },
    },
);

module.exports = mongoose.model("Cart", CartSchema);
