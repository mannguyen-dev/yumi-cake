const express = require("express");
require("./db/mongoose.js");
const userRouter = require("./routers/user");
const productRouter = require("./routers/product");
const reviewRouter = require("./routers/review");
const orderRouter = require("./routers/order");
const cors = require("cors");

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cors());
app.use(userRouter);
app.use(productRouter);
app.use(reviewRouter);
app.use(orderRouter);

app.listen(port, () => {
    console.log("Server is up on port " + port);
});
