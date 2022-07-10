const path = require("path");
const express = require("express");
const hbs = require("hbs");
const request = require("postman-request");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

//Define paths for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//Set up Handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//Set up static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Jake Readman",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Page",
    name: "Jake Readman",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help Page",
    name: "Jake Readman",
    message: "This is the help page with loads of useless FAQs",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address",
    });
  }
  const location = req.query.address;

  geocode(location, (error, { location, latitude, longitude } = {}) => {
    if (error) {
      return res.send({ error });
    }
    forecast(longitude, latitude, (error, data) => {
      if (error) {
        return res.send({ error });
      }
      res.send({
        forecast: data,
        location: location,
      });
    });
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    message: "Help article not found",
    name: "Jake Readman",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    message: "404 Biatch - Page not found",
    name: "Jake Readman",
  });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
