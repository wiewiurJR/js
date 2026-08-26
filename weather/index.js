const express = require('express');
require('dotenv').config();
const app = express()
const fs = require('fs');
const PORT = 3000;

app.set('view engine', 'ejs');
app.set('views', './view');
app.use(express.urlencoded({ extended: true }));



app.get('/', (req, res) => res.render('main.ejs'));

app.post('/message', async (req,res) => {

    const date = new Date();
    console.log(date.getMonth());
    console.log(date.getFullYear());
    console.log(date.getDate());



    const location = req.body.city;
    console.log(location);
    try{
    const locationResponse = await fetch(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/` +
        `${location}/${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}` +
        `?unitGroup=metric` +
        `&lang=pl` +
        `&include=days,hours` +
        `&key=${process.env.API_KEY}` +
        `&contentType=json`);

    if(!locationResponse.ok){
        return res.render('main.ejs', {error: 'Location not found'})

    }
    const locationData = await locationResponse.json();
    console.log(locationData);

const weather = {
    city: locationData.resolvedAddress,
    date: locationData.days[0].datetime,
    temp: locationData.days[0].temp,
    description: locationData.days[0].description,
    humidity: locationData.days[0].humidity
}



    res.render('main.ejs', {weather:weather,error:null});





    }catch(error) {
        console.log(error);
        res.render('main.ejs', {error: 'Something went wrong'})
    }
})




app.listen(3000, () => console.log(`Server in Running on http://localhost:${PORT}`));