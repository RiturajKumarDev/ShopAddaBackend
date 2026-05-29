const fs = require("fs");
const Product = require("../modules/Product");

exports.uploadProduct = async (req, res, next) => {
    const { name, brand, rating, reviews, price, originalPrice, discount, description, features, specifications, images, colors, sizes, inStock } = req.body;
    const product = new Product({ name, brand, rating, reviews, price, originalPrice, discount, description, features, specifications, images, colors, sizes, inStock });
    product.save()
        .then(result => {
            return res.status(201).json(product);
        }).catch(error => {
            return res.status(422).json({ "errors": error.errmsg });
        });
};

exports.getProduct = async (req, res, next) => {
    const { _id } = req.params;
    try {
        const product = await Product.findById(_id);
        res.status(204).json(product);
    }
    catch (err) {
        res.status(500).json({ errors: "Server Error" + err.errmsg });
    }
};

exports.getProducts = async (req, res, next) => {
    Product.find()
        .then((products) => {
            res.status(201).json(products);
        })
        .catch((error) => {
            res.status(422).json({ "errors": error.errmsg });
        })
};
