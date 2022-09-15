const mongoose = require("mongoose");

module.exports = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        });
        const flag = "[Mongodb]".blue.bold;
        const message = ` connected to (${conn.connection.name})`.magenta.bold;
        console.log(flag + message);
    } catch (error) {
        console.log(`${error.message}`.red.underline.bold);
        process.exit(1);
    }
};
