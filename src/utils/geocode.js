const request = require("postman-request");

const geocode = (address, callback) => {
  const url = `http://api.positionstack.com/v1/forward?access_key=c84da24001e4d5378af69496959f5918&query=${encodeURIComponent(
    address
  )}&limit=1`;
  request({ url, json: true }, (error, response) => {
    if (error) {
      callback("error with weather api");
    } else if (response.body.error || !response.body.data.length) {
      callback("Error accessing geolocation");
    } else {
      const location = response.body.data[0].label;
      const lat = response.body.data[0].latitude;
      const long = response.body.data[0].longitude;
      callback(undefined, {
        latitude: lat,
        longitude: long,
        location: location,
      });
    }
  });
};

module.exports = geocode;
