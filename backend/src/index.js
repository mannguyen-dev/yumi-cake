const express = require("express");
require("./db/mongoose.js");
const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");
const productRouter = require("./routers/product");
const reviewRouter = require("./routers/review");

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);
app.use(productRouter);
app.use(reviewRouter);

app.listen(port, () => {
    console.log("Server is up on port " + port);
});
