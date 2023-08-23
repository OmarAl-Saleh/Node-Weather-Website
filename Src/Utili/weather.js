const request = require("request");

const weather = (lat, long, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=a4c326861bad0a5200a08ae6924dd41f&query=" +
    encodeURIComponent(lat) +
    "," +
    encodeURIComponent(long);
  request(
    {
      url /*we use here shorthand because the variable url is the same name with the parameter*/,
      json: true,
    },
    (error, { body } = {}) => {
      if (error) callback("low level error found, check the wifi");
      else if (body.error)
        callback(
          "an error in the url features like the query is not write right"
        );
      else
        callback(undefined, {
          weather_descriptions:
            body.current.weather_descriptions[0] +
            " It is currently " +
            body.current.temperature +
            " degrees out. It feels like  " +
            body.current.feelslike +
            " degree out.",
        });
    }
  );
};
module.exports = weather;

/*const WeatherURL =
  "http://api.weatherstack.com/current?access_key=a4c326861bad0a5200a08ae6924dd41f&query=37.8267,-122.4233";
// we open the documentation in our api website and the key unit is to make the degree in fahrenheit
// "https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1Ijoib21hci1hbHNhbGVoIiwiYSI6ImNsbGFzYzZydjAwb2czbHJzejR4M2ZjZnAifQ.EQuZVZ-c6DPEGyEXy_LfrQ&limit=1";
const geocodeURL =
  "https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1Ijoib21hci1hbHNhbGVoIiwiYSI6ImNsbGFzYzZydjAwb2czbHJzejR4M2ZjZnAifQ.EQuZVZ-c6DPEGyEXy_LfrQ&limit=1";
request({ url: WeatherURL, json: true }, (error, response) => {
  //const data = JSON.parse(response.body); we add json to replace it
  //console.log(data.current);
  if (error) {
    console.log("low level error is found");
  } else if (response.body.error) {
    console.log(
      "an error in the url features like the query is not write right"
    );
  } else {
    console.log(
      response.body.current.weather_descriptions[0] +
        " It is currently " +
        response.body.current.temperature +
        " degrees out. It feels like  " +
        response.body.current.feelslike +
        " degree out."
    );
  }
}); */
