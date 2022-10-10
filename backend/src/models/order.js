const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },

        date: {
            type: mongoose.Schema.Types.Date,
            require: true,
            default: new Date(),
        },
        details: [
            {
                product_id: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product",
                },
                amount: {
                    type: Number,
                },
                weight: {
                    type: Number,
                },
                price: {
                    type: Number,
                },
                message: {
                    type: String,
                    trim: true,
                },
            },
        ],
        address: {
            type: String,
            trim: true,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

// overide toJSON method
// reviewSchema.methods.toJSON = function () {
//     const review = this;
//     const reviewObject = review.toObject();

//     // delete private fields
//     delete reviewObject.images;

//     return reviewObject;
// };

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
