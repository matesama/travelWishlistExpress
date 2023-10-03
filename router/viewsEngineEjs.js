const express = require("express");
const viewsEngineEjs = express.Router();
const countriesList =  require('../countriesList');

viewsEngineEjs.get('/', (req, res) => {
    const countries = countriesList;
    res.render('pages/index', {
        countries: countries
    });
})

viewsEngineEjs.post('/', (req, res) => {
    const { name, alpha2Code, alpha3Code, visited } = req.body;
    

  // Create a new country object
  const newCountry = {
    name: name,
    alpha2Code: alpha2Code,
    alpha3Code: alpha3Code,
    visited: Boolean(visited) // Convert to a boolean
  };

  // Add the new country to the array
  countriesList.push(newCountry);

  // Redirect back to the index page to see the updated list
  res.redirect("/");
})



  module.exports = viewsEngineEjs;