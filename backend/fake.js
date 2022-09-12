const casual = require("casual");

const user = {
    name: casual.full_name,
    email: casual.email,
    password: casual.password,
    isAdmin: casual.boolean,
};
console.log(user);
