const bcrypt = require("bcryptjs");
const { faker } = require("@faker-js/faker");

const users = [
    {
        name: faker.name.fullName(),
        email: "admin@test.com",
        password: bcrypt.hashSync("12345678", 10),
        isAdmin: true,
    },
    {
        name: faker.name.fullName(),
        email: faker.internet.exampleEmail(),
        password: bcrypt.hashSync(faker.random.alpha(10), 10),
    },
    {
        name: faker.name.fullName(),
        email: faker.internet.exampleEmail(),
        password: bcrypt.hashSync(faker.random.alpha(10), 10),
    },
    {
        name: faker.name.fullName(),
        email: faker.internet.exampleEmail(),
        password: bcrypt.hashSync(faker.random.alpha(10), 10),
    },
    {
        name: faker.name.fullName(),
        email: faker.internet.exampleEmail(),
        password: bcrypt.hashSync(faker.random.alpha(10), 10),
    },
    {
        name: faker.name.fullName(),
        email: faker.internet.exampleEmail(),
        password: bcrypt.hashSync(faker.random.alpha(10), 10),
    },
];
module.exports = users;
