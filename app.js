const express = require("express");

const travelWishListRouter = require('./router/travelWishListRouter.js');

const app = express();
app.use(express.json());
app.use('/api/countries', travelWishListRouter);

const port = process.env.Port || 4500;
app.listen(port, () => {
    console.log(`Travel Wishlist express practice is running on port ${port}`)
})