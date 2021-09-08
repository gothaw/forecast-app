const https = require('https');
const API_KEY = ''; // Insert your API key here

const printMessage = (city, forecast) => {
	
	if (forecast?.error || !forecast || !forecast?.current) {
		console.log(forecast?.error?.message || 'Something went wrong');
		return;
	}

	const { current, location } = forecast;
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

const getForecast = city => {

	if (!city) {
		console.log('Please provide city.');
	}

	const request = https.get(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=no`, response => {
		let responseBody = '';

		response.on('data', data => {
			responseBody += data.toString();
		});

		response.on('end', () => {
			const forecast = JSON.parse(responseBody);
			printMessage(city, forecast);
		});

	}).on('error', (e) => {
		console.log('Ooops, something went wrong!');
	});
};

const city = process.argv[2]; // using first argument passed in command line, ignoring node and project path

getForecast(city);
