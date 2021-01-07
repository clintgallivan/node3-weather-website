const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=67e3122b1d6f5dfeaa2d861fb51c068b&query=" +
    latitude +
    "," +
    longitude +
    "&units=f";

  request({ url, json: true }, (error, { body } = {}) => {
    if (error) {
      callback("Unable to connect to weather service!", undefined);
    } else if (body.error) {
      callback("Unable to find location", undefined);
    } else {
      callback(
        undefined,
        `${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} degrees out. It feels like ${body.current.feelslike} degrees out. Visibility is ${body.current.visibility} miles, and cloud cover is ${body.current.cloudcover}%. There is a UV Index reading of ${body.current.uv_index}.`
      );
    }
  });
};

module.exports = forecast;
