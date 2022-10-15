const express = require("express");
const router = new express.Router();
const auth = require("../middleware/auth");
const Order = require("../models/order");
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

// POST a Order
router.post("/orders", auth, async (req, res) => {
    const order = new Order({
        ...req.body,
        user_id: req.user._id,
    });

    try {
        await order.save();
        res.status(201).send(order);
    } catch (e) {
        res.status(400).send(e);
    }
});

// GET /tasks?completed=true
// limit skip
// GET /tasks?limit=10&skip
// GET /tasks?sortBy=createdAt:asc(desc)
router.get("/orders", async (req, res) => {
    const match = {};
    const sort = {};

    if (req.query.address) {
        match.address = { $regex: ".*" + req.query.address + ".*", $options: "i" };
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
        const orders = await Order.find(match).limit(limit).skip(skip).sort(sort);
        res.send(orders);
    } catch (e) {
        res.status(500).send();
    }
});

//GET Order by Order id
router.get("/orders/:id", async (req, res) => {
    const _id = req.params.id;

    try {
        const order = await Order.findById(_id);

        if (!order) {
            return res.status(404).send();
        }
        res.send(order);
    } catch (e) {
        res.status(500).send(e);
    }
});

//GET Order by Order id
router.get("/ordersbyme/", auth, async (req, res) => {
    const _id = req.user._id;

    try {
        const orders = await Order.find({
            user_id: _id,
        });

        // if (order) {
        //     return res.status(404).send();
        // }
        res.send(orders);
    } catch (e) {
        res.status(500).send(e);
    }
});

//Update product by id
router.patch("/orders/:id", auth, async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ["details", "address"];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(404).send({ error: "Invalid update!" });
    }

    try {
        const order = await Order.findOne({
            _id: req.params.id,
            user_id: req.user._id,
        });

        if (!order) {
            return res.status(404).send();
        }

        updates.forEach((update) => (order[update] = req.body[update]));

        await order.save();
        res.send(order);
    } catch (e) {
        res.status(404).send();
    }
});

// Delete product by id
router.delete("/orders/:id", auth, async (req, res) => {
    try {
        const order = await Order.findOne({
            _id: req.params.id,
            user_id: req.user._id,
        });

        if (!order) {
            return res.status(404).send();
        }

        order.remove();
        res.send(order);
    } catch (e) {
        res.status(404).send(e);
    }
});

module.exports = router;