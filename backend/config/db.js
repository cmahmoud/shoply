const mongoose = require("mongoose");

module.exports = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        });
        console.log(
            "[Mongodb]".blue.bold +
                ` connected to ${conn.connection.host}`.magenta.bold
        );
    } catch (error) {
        console.log(`${error.message}`.red.underline.bold);
        process.exit(1);
    }
};
