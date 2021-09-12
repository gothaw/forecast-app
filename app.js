
const API_KEY = ''; // Insert your API key here

const forecast = require('./forecast');
const city = process.argv[2]; // using first argument passed in command line, ignoring node and project path

forecast.get(city, API_KEY);
