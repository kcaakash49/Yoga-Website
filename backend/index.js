const express = require("express");

const app = express();
const classRouter = require("./src/routes/products")
const userRouter = require("./src/routes/users")
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/class',classRouter);
app.use("/users", userRouter)

app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});
