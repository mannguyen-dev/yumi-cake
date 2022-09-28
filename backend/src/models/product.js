const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
        },
        description: {
            type: String,
            trim: true,
            required: true,
        },
        sizes: [
            {
                weight: {
                    type: Number,
                },
                price: {
                    type: Number,
                },
            },
        ],
        categories: [String],
        images: [Buffer],
    },
    {
        timestamps: true,
    }
);

// overide toJSON method
productSchema.methods.toJSON = function () {
    const product = this;
    const productObject = product.toObject();

    // delete private fields
    delete productObject.images;

    return productObject;
};

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
