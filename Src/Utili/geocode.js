const request = require("request");

const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1Ijoib21hci1hbHNhbGVoIiwiYSI6ImNsbGFzYzZydjAwb2czbHJzejR4M2ZjZnAifQ.EQuZVZ-c6DPEGyEXy_LfrQ&limit=1";
  request({ url: url, json: true }, (error, { body } = {}) => {
    // we must make default value to destructure if an error occur to insert undefined to body
    // here i use destructure method instead of traditional response
    if (error) {
      callback("low level error is found,check the wifi", undefined); // you can omit the undefined it will not cause anything
    } else if (body.features.length == 0) {
      callback(
        //"the length of the array is 0, the url syntax is wrong",
        "Unable to find location. Try another search.",
        undefined
      );
    } else {
      callback(undefined, {
        // pay attention here you must insert the undefined
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name,
      });
    }
  });
};
module.exports = geocode;

/*request({ url: geocodeURL, json: true }, (error, response) => {
  if (error) {
    console.log("low level error is found");
  } else if (response.body.error) {
    console.log(
      "an error in the url features like the query is not write right"
    );
  } else if (response.body.features.length == 0) {
    console.log("the length of the array is 0, the url syntax is wrong");
  } else {
    const latitude = response.body.features[0].center[1];
    const longitude = response.body.features[0].center[0];
    console.log(
      "the latitude is :" + latitude + "the longitude is  : " + longitude
    );
  }
});*/
