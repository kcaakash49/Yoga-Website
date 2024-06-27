const express = require("express");

const app = express();
const classRouter = require("./src/routes/products")
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/class',classRouter)

app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});
