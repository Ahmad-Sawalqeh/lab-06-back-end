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


server.listen(PORT, () => console.log(`app listening on ${PORT}`)) 