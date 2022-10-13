const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
        product_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Product",
        },
        date: {
            type: mongoose.Schema.Types.Date,
            require: true,
            default: new Date(),
        },
        title: {
            type: String,
            trim: true,
            required: true,
        },
        content: {
            type: String,
            trim: true,
            required: true,
        },
        stars: {
            type: mongoose.Schema.Types.Number,
        },
        images: [
            {
                type: Buffer,
            },
        ],
    },
    {
        timestamps: true,
    }
);

// overide toJSON method
reviewSchema.methods.toJSON = function () {
    const review = this;
    const reviewObject = review.toObject();

    // delete private fields
    delete reviewObject.images;

    return reviewObject;
};

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
