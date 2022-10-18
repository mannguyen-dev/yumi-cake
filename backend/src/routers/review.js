const express = require("express");
const auth = require("../middleware/auth");
const Review = require("../models/review");
const multer = require("multer");
const sharp = require("sharp");

const router = new express.Router();
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

// POST a review
router.post("/reviews", auth, async (req, res) => {
    const review = new Review({
        ...req.body,
        user_id: req.user._id,
    });

    try {
        await review.save();
        res.status(201).send(review);
    } catch (e) {
        res.status(400).send(e);
    }
});

// UPLOAD image to review
router.post(
    "/reviews/:id/images",
    upload.any(),
    async (req, res) => {
        const review = await Review.findById(req.params.id);

        if (!review || req.files.length === 0) {
            return res.status(400).send({ error: "No file to upload | No review found" });
        }

        req.files.forEach(async (file) => {
            const buffer = await sharp(file.buffer).resize({ width: 250, height: 250 }).png().toBuffer();
            review.images.push(buffer);
        });

        await review.save();
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
router.get("/reviews", async (req, res) => {
    const match = {};
    const sort = {};

    if (req.query.product) {
        match.product_id = req.query.product;
    }

    if (req.query.user) {
        match.user = req.query.user;
    }

    if (req.query.title) {
        match.title = { $regex: ".*" + req.query.title + ".*" };
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
        const reviews = await Review.find(match).limit(limit).skip(skip).sort(sort);
        res.send(reviews);
    } catch (e) {
        res.status(500).send();
    }
});

//GET review by product id
router.get("/reviews/:id", async (req, res) => {
    const _id = req.params.id;

    try {
        const review = await Review.findById(_id);

        if (!review) {
            return res.status(404).send();
        }
        res.send(review);
    } catch (e) {
        res.status(500).send();
    }
});

// Get Image by review id and image number
router.get("/reviews/:id/images/:image", async (req, res) => {
    const _id = req.params.id;

    try {
        const review = await Review.findById(_id);

        if (!review) {
            return res.status(404).send();
        }

        res.set("Content-Type", "image/webp");
        res.send(review.images[req.params.image]);
    } catch (e) {
        res.status(500).send();
    }
});

//Update review by id
router.patch("/reviews/:id", auth, async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ["title", "content", "stars", "image"];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(404).send({ error: "Invalid update!" });
    }

    try {
        const review = await Review.findOne({
            _id: req.params.id,
            // user_id: req.user._id,
        });

        if (!review) {
            return res.status(404).send({ error: "Not found review" });
        }

        updates.forEach((update) => (review[update] = req.body[update]));

        await review.save();
        res.send(review);
    } catch (e) {
        res.status(404).send(e.message);
    }
});

// Delete review by id
router.delete("/reviews/:id", auth, async (req, res) => {
    try {
        const review = await Review.findOneAndDelete({
            _id: req.params.id,
            user_id: req.user._id,
        });

        if (!review) {
            return res.status(404).send();
        }
        res.send(review);
    } catch (e) {
        res.status(404).send();
    }
});

module.exports = router;
