const mongoose = require("mongoose");
const dotenv = require("dotenv");
const colors = require("colors");
const users = require("./data/users");
const products = require("./data/products");
const User = require("./models/user.model");
const Product = require("./models/product.model");
const Order = require("./models/order.model");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const importData = async () => {
    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        const createdUsers = await User.insertMany(users);
        const admin = createdUsers[0]._id;
        const sampleProducts = products.map((product) => {
            return { user: admin, ...product };
        });
        await Product.insertMany(sampleProducts);
        console.log("Data Imported".green.bold);
        process.exit();
    } catch (error) {
        console.log(`${error.message}`.red.bold);
        process.exit();
    }
};
const destroyData = async () => {
    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        console.log("Data Destroyed".green.inverse.bold);
        process.exit();
    } catch (error) {
        console.log(`${error.message}`.red.bold);
        process.exit();
    }
};
if (process.argv[2] === "-d") {
    destroyData();
} else {
    importData();
}
