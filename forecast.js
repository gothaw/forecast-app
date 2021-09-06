const https = require('https');
const API_KEY = '';

const getForecast = city => {

	const request = https.get(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=no`, res => {
		console.log(res.statusCode);

		let body = '';

		res.on('data', data => {
			body += data.toString();
		});

		res.on('end', () => {
			console.log(body);
		});
	});
};

const city = process.argv[2];

getForecast(city);
