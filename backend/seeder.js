const mongoose = require("mongoose");
const dotenv = require("dotenv");
const colors = require("colors");
const users = require("./data/users");
const products = require("./data/products");
const fakeProducts = require("./data/fakeProducts");
const User = require("./models/user.model");
const Product = require("./models/product.model");
const Order = require("./models/order.model");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const newData = async () => {
    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        const createdUsers = await User.insertMany(users);
        const admin = createdUsers[0]._id;
        const sampleProducts = data.map(() => {
            return { user: admin, ...product };
        });
        await Product.insertMany(sampleProducts);
        console.log("newed".green.bold);
        process.exit();
    } catch (error) {
        console.log(`${error.message}`.red.bold);
        process.exit();
    }
};
const addProducts = async () => {
    try {
        const admin = await User.findOne({ email: "admin@test.com" });
        const sampleProducts = fakeProducts.map((product) => {
            return { user: admin._id, ...product };
        });
        await Product.insertMany(sampleProducts);
        console.log("added".green.bold);
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
let args = process.argv.slice(2);
switch (args[0]) {
    case "destroy":
        destroyData();
        break;
    case "new":
        newData();
        break;
    case "add":
        addProducts();
        break;
    default:
        console.log("No Options".red.bold);
        process.exit();
}
