const { faker } = require("@faker-js/faker");

const arr = Array.from(faker.random.alpha(10));
const fakeProducts = arr.map((x) => ({
    name: faker.commerce.productName(),
    image: "/images/alexa.jpg",
    description: faker.commerce.productDescription(),
    brand: faker.company.name(),
    category: "Electronics",
    price: faker.commerce.price(100),
    countInStock: faker.datatype.number({ max: 1000 }),
    rating: faker.datatype.float({ min: 0, max: 5, precision: 0.5 }),
    numReviews: faker.datatype.number({ min: 1, max: 1000 }),
}));

module.exports = fakeProducts;
