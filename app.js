const express = require("express");
const { body, validationResult } = require('express-validator');
const app = express();
const port = 4500;
const countriesList =  require('./countriesList');

app.get('/api/countries', (req, res) => {
    const sort = req.query.sort;
    
    
       
    if(sort === 'true') {
        const sortList= countriesList.sort((a, b) => {
            let nameA = a.name.toLowerCase();
            let nameB = b.name.toLowerCase();

            if(nameA < nameB) {
                return -1;
            }
            if(nameA > nameB) {
                return 1;
            } else{ 
                return 0;
            }
        });

        
        
        res.json(sortList) 
    } else if(countriesList) {
        res.json(countriesList) 
    
        
    } else {
        res.status(404).send('Countries List nor found');
    }
})

app.use(express.json());
/*const checkAlpha2Code = "alpha2Code";
const checkAlpha3Code = "alpha3Code";

const sameKeysObjects = (value, { req }) => {
    const keysToCheck = Object.keys(value);
    const newCountry = req.body;

    return ( 
        keysToCheck.every(key => Object.keys(newCountry).includes(key)) &&
        keysToCheck.every(
            key => key === checkAlpha2Code ? newCountry[key].length === 2 : newCountry[key].trim() !== ''
            ) &&
        keysToCheck.every(
            key => key === checkAlpha3Code ? newCountry[key].length === 3 : newCountry[key].trim() !== ''
            ) &&
        countriesList.every(country =>
            keysToCheck.every(
                key => newCountry["alpha2Code"] ? country[key].length === 2 : country[key].trim() !== ''
                ) &&
            keysToCheck.every(key => country[key].trim !== '')
            ) &&
            countriesList.every(country =>
                keysToCheck.every(key => Object.keys[country].includes(key)) && 
                keysToCheck.every(
                    key => newCountry["alpha3Code"] ? country[key].length === 3 : country[key].trim() !== ''
                    ) 
                ) 
            

        
        )


}*/

const countryValidation = [
    body('name').isString().optional(),
    body('alpha2Code').exists().isLength({ min:2, max:2 }).optional(),
    body('alpha3Code').exists().isLength({ min:3, max:3 }).optional()
] 

app.post('/api/countries', 
    countryValidation
    
, (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
    }
    const newCountry = req.body;

    const findCountryName = (list, newCountry) => {
        return list.some(country => country['alpha2Code'] === newCountry['alpha2Code'] && country['alpha3Code'] === newCountry['alpha3Code']);
    }

    const countryAvailabilityTest = findCountryName(countriesList, newCountry);

    if(countryAvailabilityTest === true) {
        console.log(`${newCountry.name} is already in the List!`);
    } else{
        //here Insert random id for country
        countriesList.push(newCountry);
        console.log(countriesList);
    }
    
    res.json(newCountry);
    
})


app.get('/api/countries/:code', (req, res) => {
    const code = req.params.code;

    const searchCountry = countriesList.find(({ alpha2Code, alpha3Code }) => alpha2Code === code.toUpperCase() || alpha3Code === code.toUpperCase());
    if(searchCountry) {
    res.json(searchCountry);
    } else {
        res.status(404).send('Country not found');
    }
} )

app.put('/api/countries/:code', countryValidation, (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
    }
    const code = req.params.code;
    const countryUpdateBody = req.body;

    const searchCountry = countriesList.find(({ alpha2Code, alpha3Code }) => alpha2Code === code.toUpperCase() || alpha3Code === code.toUpperCase());
    console.log(searchCountry)
    if(!searchCountry) {
        return res.status(404).json({error: 'Country not found'});
    } 

    const indexOfCountry = countriesList.findIndex(country => country["alpha2Code"] === code.toUpperCase() || country["alpha3Code"] === code.toUpperCase()  )

        //spread Syntax to create a copy of the objects and array to merge them. To maintain data immutability.
    countriesList[indexOfCountry] = {... countriesList[indexOfCountry], ...countryUpdateBody}
    res.json({message: 'Country Update successful', countryUpdateBody})
   

} )

app.delete('/api/countries/:code', (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
    }
    
    const code = req.params.code;

    const searchCountry = countriesList.find(({ alpha2Code, alpha3Code }) => alpha2Code === code.toUpperCase() || alpha3Code === code.toUpperCase());
    console.log(searchCountry)
    if(!searchCountry) {
        return res.status(404).json({error: 'Country not found'});
    } 

    const indexOfCountry = countriesList.findIndex(country => country["alpha2Code"] === code.toUpperCase() || country["alpha3Code"] === code.toUpperCase()  )
    countriesList.splice(indexOfCountry, 1);
    
    res.json({message: 'Country Update successful', searchCountry})



})



app.listen(port, () => {
    console.log(`Travel Wishlist express practice is running on port ${port}`)
})