const path = require("path"); // core module
const express = require("express"); // npm module
const app = express();
const hbs = require("hbs");
//const port = 3000; for local use
port = process.env.PORT || 3000;
const request = require("request");
const geocode = require("./Utili/geocode.js");
const Weather = require("./Utili/weather.js");
//console.log(__dirname);
//console.log(path.join(__dirname, "../public"));
//console.log(__filename); traditional

// Define paths for Express config to can js file know them
const viewPath = path.join(__dirname, "../tamplates/views"); // it can be optional here to indicate our views file if we want to put it in another place
//const publicDirectoryPath = path.join(__dirname, "../public/html");
const publicPath = path.join(__dirname, "../Public"); // to use css and Js files
const partialPath = path.join(__dirname, "../tamplates/partial");

//Setup handlebars engine and views location
app.set("view engine", "hbs"); // its for default location(root dir) as we use in this project
app.set("views", viewPath); // it can be optional because we define the views directory in the default location
hbs.registerPartials(partialPath);

//Setup static directory to serve
//app.use(express.static(publicDirectoryPath));
app.use(express.static(publicPath));
//
app.get("", (req, res) => {
  // use to implement our views
  res.render("index", {
    title: "Weather App",
    name: "OMAR AL-SALEH",
  });
});
app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name: "OMAR AL-SALEH",
  }); // its for about dynamic file we not have to write about.html when we call it
});
app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "OMAR AL-SALEH",
    helpText: "This is some helpful text.",
  });
});

/*app.get("", (req, res) => {
    res.send("<h1>Welcome to Server </h1>");
  });*/ // we instead it by app.use with index.html the index is keyword index to main page
/*app.get("/help", (req, res) => {
  res.send([
    {
      // for json file
      name: "omar",
      age: 20,
    },
    {
      name: "ahmed",
      age: 30,
    },
  ]);
});
/*app.get("/about", (req, res) => {// we make an html page to about page instead of that
    res.send("This is about page");
  });*/

// API request
app.get("/weather", (req, res) => {
  //that is the implementation to our weather app
  if (!req.query.address) {
    return res.send({
      error: "you must insert an address",
    });
  }
  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) return res.send({ error }); // this way is better than use else statement and many nested scopes
      Weather(latitude, longitude, (error, forecast) => {
        if (error) return res.send({ error });
        //console.log(location);
        //console.log(forecast.weather_descriptions);
        res.send({
          location: location,
          forecast: forecast.weather_descriptions,
          address: req.query.address,
        });
      });
    }
  );

  /*res.send({
    forecast: "it is snowing",
    location: "Philadelphia",
    address: req.query.address,
  });*/
});
app.get("/products", (req, res) => {
  // a demo to try query string and requests to server from web page
  // console.log(req.query);
  if (!req.query.search) {
    return res.send({
      // to not send two response and make an error
      error: "you must provide a search term",
    });
  }
  res.send({
    products: [],
  });
});
// 404 page error message
app.get("/help/*", (req, res) => {
  // its specific error page
  // res.send("help article not found");
  res.render("404", {
    title: "404",
    error: "help article is not found",
    name: "Omar",
  });
});
app.get("*", (req, res) => {
  // you must wrote it in the last before listen it like default in switch
  //res.send("<h1 style='color:red'>my 404 page the page is not found</h1>");
  res.render("404", {
    title: "404",
    error: "Page not found ",
    name: "omar",
  });
});
//local server on port : 3000
// app.listen(port, () => {
//   // to start the server
//   console.log("the server is running on port " + port);
// });
// global cyclic server and make or with port which is the local port 3000
app.listen(port, () => {
  console.log("the server is running  on port" + port);
});
