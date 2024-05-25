const express = require("express");
const app = express();
require("dotenv").config();
require("./db/db");
const bodyParser = require("body-parser");
const morgan = require("morgan");

//import routes
const categoryRoute = require("./routes/categoryRoute");
const productRoute = require("./routes/productRoute");
const userRoute = require("./routes/userRoute");

//middleware
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use("/public/uploads", express.static("public/uploads"));

//routes
app.get("/", (req, res) => {
  res.send("Hello world");
});

app.use("/api", categoryRoute);

app.use("/api", productRoute);

app.use("/api", userRoute);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server stated on port ${port}`);
});
