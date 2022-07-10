const request = require("postman-request");

//
// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)

const forecast = (longitude, latitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=21a264a79d988431441939458e047391&query=${latitude},${longitude}`;
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("error with weather api");
    } else if (body.error) {
      callback(body.error);
    } else {
      const { temperature: temp, precip: rain } = body.current;
      const weatherDescription = body.current.weather_descriptions[0];
      callback(
        undefined,
        `It is currently ${temp} degrees. There is a ${rain}% chance of rain. It is ${weatherDescription}`
      );
    }
  });
};
module.exports = forecast;
