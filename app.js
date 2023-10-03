const express = require("express");
const bodyParser = require('body-parser');
const countriesList =  require('./countriesList');
const travelWishListRouter = require('./router/travelWishListRouter.js');
const viewsEngineEjs = require('./router/viewsEngineEjs');


const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded form data --> Allow the form to use the req.body
app.set('view engine', 'ejs');

app.use('/', viewsEngineEjs);
app.use('/api/countries', travelWishListRouter);

const port = process.env.Port || 4500;
app.listen(port, () => {
    console.log(`Travel Wishlist express practice is running on port ${port}`)
})