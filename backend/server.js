const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const colors = require("colors");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const ProductRoutes = require("./routes/product.route");
const UserRoutes = require("./routes/user.route");
const OrderRoutes = require("./routes/order.route");

dotenv.config();
connectDB();
const app = express();
const port = process.env.PORT || 5000;

// Middlewares
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Api Routes
app.use("/api/products", ProductRoutes);
app.use("/api/user", UserRoutes);
app.use("/api/order", OrderRoutes);

// run server
app.listen(
    port,
    "0.0.0.0",
    console.log(
        colors.blue.bold("[Shoply]") +
            ` Server running on port ${port}...`.yellow.bold
    )
);
