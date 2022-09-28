const express = require("express");
const router = new express.Router();
const auth = require("../middleware/auth");
const Product = require("../models/product");
const multer = require("multer");
// const sharp = require("sharp");

const upload = multer({
    limits: {
        fileSize: 10_000_000,
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png|webp)$/)) {
            return cb(new Error("Please upload an image file"));
        }

        cb(undefined, true);
    },
});

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

router.post(
    "/products/:id/images",
    upload.any(),
    async (req, res) => {
        const product = await Product.findById(req.params.id);

        if (!product || req.files.length === 0) {
            return res.status(400).send({ error: "No file to upload | No product found" });
        }

        req.files.forEach((file) => {
            product.images.push(file.buffer);
        });

        await product.save();
        res.send();
    },
    (error, req, res, next) => {
        res.status(400).send({ error: error.message });
    }
);

// GET /tasks?completed=true
// limit skip
// GET /tasks?limit=10&skip
// GET /tasks?sortBy=createdAt:asc(desc)
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

router.get("/products/:id", async (req, res) => {
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

router.get("/products/:id/images/:image", async (req, res) => {
    const _id = req.params.id;

    try {
        const product = await Product.findById(_id);

        if (!product) {
            return res.status(404).send();
        }

        res.set("Content-Type", "image/webp");
        res.send(product.images[req.params.image]);
    } catch (e) {
        res.status(500).send();
    }
});

router.patch("/products/:id", async (req, res) => {
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

router.delete("/products/:id", auth, async (req, res) => {
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

module.exports = router;
