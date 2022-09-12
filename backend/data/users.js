const bcrypt = require("bcryptjs");
const casual = require("casual");

const users = [
    {
        name: casual.full_name,
        email: "admin@test.com",
        password: bcrypt.hashSync("12345678", 10),
        isAdmin: true,
    },
    {
        name: casual.full_name,
        email: "sandy@test.com",
        password: bcrypt.hashSync("12345678", 10),
    },
    {
        name: casual.full_name,
        email: "john@test.com",
        password: bcrypt.hashSync("12345678", 10),
    },
];
module.exports = users;
