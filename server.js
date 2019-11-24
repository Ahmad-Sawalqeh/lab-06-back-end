`use strict`;

require('dotenv').config();

const express = require('express');

const cors = require('cors');

const PORT = process.env.PORT;

const server = express();

server.use(cors());


server.get('/location', (request, response) => {
    const locationData = require('./data/geo.json');
    const location = new Location(locationData);
    response.status(200).json(location);
})

function Location(data) {
    this.search_query = 'lynnwood';
    this.formatted_query = data.results[0].formatted_address;
    this.lat = data.results[0].geometry.location.lat;
    this.lng = data.results[0].geometry.location.lng;
}

server.get('/weather', (request, response) => {

    const weatherData = require('./data/darksky.json');
    const weatherEach = weatherData.daily.data.map((day) => {
        const weather = new Weather(day);
        return weather
    })
    response.status(200).json(weatherEach);
})

function Weather(jsonData) {
    this.forcast = jsonData.summary;
    this.time = new Date(jsonData.time * 1000).toDateString();
}

server.get('/', (request, response) => {
    response.status(200).send('hello from Tafila ')
})

server.use('*', (request, response) => {
    response.status(404).send('can not be reach');
});
server.use((error, request, response) => {
    response.status(500).send('we are sorry')
})


server.listen(PORT, () => console.log(`app listening on ${PORT}`)) 