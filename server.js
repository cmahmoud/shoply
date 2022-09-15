const express = require("express");
const path = require("path");
const morgan = require("morgan");
const dotenv = require("dotenv");
const colors = require("colors");
const bodyParser = require("body-parser");
const connectDB = require("./backend/config/db");
const ProductRoutes = require("./backend/routes/product.route");
const UserRoutes = require("./backend/routes/user.route");
const OrderRoutes = require("./backend/routes/order.route");
const UploadRoutes = require("./backend/routes/upload.route");

dotenv.config();
connectDB();
const app = express();
const port = process.env.PORT || 5000;

// Middlewares
if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Api Routes
app.use("/api/products", ProductRoutes);
app.use("/api/user", UserRoutes);
app.use("/api/order", OrderRoutes);
app.use("/api/upload", UploadRoutes);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(express.static(path.join(path.join(__dirname, "frontend/build"))));

app.get("/*", function (req, res) {
    res.sendFile(path.join(__dirname, "frontend/build", "index.html"));
});
// run server
app.listen(
    port,
    "0.0.0.0",
    console.log(
        colors.blue.bold("[Shoply]") +
            ` Server running on port ${port}...`.yellow.bold
    )
);
