const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const colors = require("colors");
const connectDB = require("./config/db");
const ProductRoutes = require("./routes/product.route");
const errorHandler = require("./middleware/error");

dotenv.config();
connectDB();
const app = express();
const port = process.env.PORT || 5000;

// Middlewares
app.use(morgan("dev"));

// Api Routes
app.use("/api/products", ProductRoutes);
app.use(errorHandler);
app.listen(
    port,
    "0.0.0.0",
    console.log(
        colors.blue.bold("[Shoply]") +
            ` Server running on port ${port}...`.yellow.bold
    )
);
