# forecast-app

Node.js command line application that takes a city name and retrieves the forecast for today.
It uses [Weather API](https://www.weatherapi.com).

The purpose of the app was to practice fetching data using **https.get()** and using data, completion and error events on the response.

### Example

To run the app:
```
node forecast.js London
```
The app requires an API key that can be created for free on Weather API [website](https://www.weatherapi.com/pricing.aspx).
Add this key to the ``API_KEY`` constant in the app. 

### Built With
JavaScript, Node.js (v. ^14.17.0)

### Authors
Radoslaw Soltan

### License
This project is under the MIT License - see the LICENSE.md file for details.