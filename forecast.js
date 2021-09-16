const http = require('http');
const https = require('https');
const api = require('./api.json');
const API_KEY = api.key;

/**
 * Function that print error message using console.error
 * @param error
 */
const printError = error => {
  console.error(error.message);
};

/**
 * Function that prints forecast for given city
 * @param city - String
 * @param forecast - JSON object
 */
const printMessage = (city, forecast) => {

  if (forecast?.error || !forecast || !forecast?.current) {
    console.log(forecast?.error?.message || 'Something went wrong');
    return;
  }

  const {current, location} = forecast;
  const localTime = location?.localtime?.split(' ')[1];

  console.log(
    `Weather in ${city}, ${location.country} (local time ${localTime}):
		- ${current?.condition.text}
		- Temperature ${current.temp_c} deg C,
		- Humidity ${current.humidity} %
		- Wind ${current.wind_mph} mph
		- Pressure ${current.pressure_mb} mbar`
  );
};

/**
 * Gets current weather for a city. Requires passing an API key for Weather API.
 * @param city - String
 */
const get = city => {

  if (!city) {
    console.log('Please provide city.');
  }

  try {
    const request = https.get(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=no`, response => {
      let responseBody = '';

      if (response.statusCode !== 200) {
        const message = `There was an error getting forecast for ${city}: ${http.STATUS_CODES[response.statusCode]}`;
        const statusCodeError = new Error(message);
        printError(statusCodeError);

        return;
      }

      response.on('data', data => {
        responseBody += data.toString();
      });

      response.on('end', () => {
        const forecast = JSON.parse(responseBody);
        printMessage(city, forecast);
      });

    }).on('error', e => {
      console.error(`Ooops, there was a problem with your request: ${e.message}`);
    });
  } catch (error) {
    printError(error.message);
  }

};

module.exports.get = get;
