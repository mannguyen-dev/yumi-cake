const express = require("express");
const router = new express.Router();
const auth = require("../middleware/auth");
const Product = require("../models/product");
const Order = require("../models/order");
const mongoose = require("mongoose");
// const multer = require("multer");
// const sharp = require("sharp");

// (no longer use because we no need to updoad file)
// const upload = multer({
//     limits: {
//         fileSize: 10_000_000,
//     },
//     fileFilter(req, file, cb) {
//         if (!file.originalname.match(/\.(jpg|jpeg|png|webp)$/)) {
//             return cb(new Error("Please upload an image file"));
//         }

//         cb(undefined, true);
//     },
// });

// POST a product
router.post("/products", async (req, res) => {
    const product = new Product({
        ...req.body,
    });

    try {
        await product.save();
        res.status(201).send(product);
    } catch (e) {
        res.status(400).send(e);
    }
});

router.post("/products/many", async (req, res) => {
    const products = req.body;

    const productsAdded = [];

    try {
        products.forEach(async (item) => {
            const product = new Product({
                ...item,
            });
            await product.save();
        });
        res.send({ numberItem: products.length, products });
    } catch (error) {
        res.status(400).send({ error });
    }
});

// UPLOAD image to product (no longer use)
// router.post(
//     "/products/:id/images",
//     upload.any(),
//     async (req, res) => {
//         const product = await Product.findById(req.params.id);

//         if (!product || req.files.length === 0) {
//             return res.status(400).send({ error: "No file to upload | No product found" });
//         }

//         req.files.forEach((file) => {
//             product.images.push(file.buffer);
//         });

//         await product.save();
//         res.send();
//     },
//     (error, req, res, next) => {
//         res.status(400).send({ error: error.message });
//     }
// );

// GET /products?name=abc
// limit skip
// GET /products?limit=10&skip
// GET /products?sortBy=createdAt:asc(desc)
router.get("/products", async (req, res) => {
    const match = {};
    const sort = {};

    if (req.query.name) {
        match.name = { $regex: ".*" + req.query.name + ".*" };
    }

    if (req.query.category) {
        match.categories = { $in: req.query.category };
    }

    if (req.query.sortBy) {
        const parts = req.query.sortBy.split(":");
        sort[parts[0]] = parts[1] === "desc" ? -1 : 1;
    }

    let limit = 20;
    if (req.query.limit) {
        limit = parseInt(req.query.limit);
    }

    let skip = 0;
    if (req.query.skip) {
        skip = parseInt(req.query.skip);
    }

    try {
        const products = await Product.find(match).limit(limit).skip(skip).sort(sort);
        res.send(products);
    } catch (e) {
        res.status(500).send();
    }
});

//Get trending
router.get("/products/trending", async (req, res) => {
    const match = {};
    const sort = { createdAt: -1 };

    let limit = 20;
    if (req.query.limit) {
        limit = parseInt(req.query.limit);
    }

    let skip = 0;
    if (req.query.skip) {
        skip = parseInt(req.query.skip);
    }

    try {
        const products = await Product.find(match).limit(limit).skip(skip).sort(sort);
        res.send(products);
    } catch (e) {
        res.status(500).send();
    }
});

//GET product detail by product id
router.get("/products/id/:id", async (req, res) => {
    const _id = req.params.id;

    try {
        const product = await Product.findById(_id);

        if (!product) {
            return res.status(404).send();
        }
        res.send(product);
    } catch (e) {
        res.status(500).send();
    }
});

//Get Image by product id and image number (no longer use)
// router.get("/products/:id/images/:image", async (req, res) => {
//     const _id = req.params.id;

//     try {
//         const product = await Product.findById(_id);

//         if (!product) {
//             return res.status(404).send();
//         }

//         res.set("Content-Type", "image/webp");
//         res.send(product.images[req.params.image]);
//     } catch (e) {
//         res.status(500).send();
//     }
// });

//Get Image by product id and image number
router.get("/products/id/:id/images/:image", async (req, res) => {
    const _id = req.params.id;

    try {
        const product = await Product.findById(_id);

        if (!product) {
            return res.status(404).send();
        }

        const productImage = product.images[req.params.image];

        if (!productImage) return res.status(404).send({ error: "Image not found!" });

        res.set("Content-Type", "image/webp");
        res.redirect(productImage);
    } catch (e) {
        res.status(500).send();
    }
});

//Update product by id
router.patch("/products/id/:id", async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ["description", "name", "size", "categories"];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(404).send({ error: "Invalid update!" });
    }

    try {
        const product = await Product.findOne({
            _id: req.params.id,
        });

        if (!product) {
            return res.status(404).send();
        }

        updates.forEach((update) => (product[update] = req.body[update]));

        await product.save();
        res.send(product);
    } catch (e) {
        res.status(404).send();
    }
});

// Delete product by id
router.delete("/products/id/:id", auth, async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);

        if (!product) {
            return res.status(404).send();
        }
        res.send(product);
    } catch (e) {
        res.status(404).send();
    }
});

// GET all categories
router.get("/categories", async (req, res) => {
    try {
        const categories = await Product.distinct("categories");
        res.send({ categories });
    } catch (e) {
        res.status(500).send();
    }
});

const getProduct = async (id) => {
    return await Product.findById(id);
};

// GET distinct product
router.get("/products/popular", async (req, res) => {
    try {
        let limit = 20;
        if (req.query.limit) {
            limit = parseInt(req.query.limit);
        }

        let skip = 0;
        if (req.query.skip) {
            skip = parseInt(req.query.skip);
        }

        const details = await Order.find({}).select({ details: 1 });

        let listDetails = [];

        for (const item of details) {
            listDetails = listDetails.concat(item.details);
        }

        let listItem = [];

        for (const item of listDetails) {
            const existed = listItem.find((i) => i.product_id.toString() === item.product_id.toString());

            if (existed) {
                existed.amount += item.amount;
            } else {
                listItem.push({ product_id: item.product_id, amount: item.amount });
            }
        }

        listItem.sort((a, b) => b.amount - a.amount);

        listItem = listItem.slice(skip, limit + skip);

        const promises = listItem.map(async (item) => {
            const res = await Product.findById(mongoose.Types.ObjectId(item.product_id));
            return res;
        });
        const products = await Promise.all(promises);
        res.send(products);
    } catch (e) {
        res.status(500).send(e);
    }
});

module.exports = router;
