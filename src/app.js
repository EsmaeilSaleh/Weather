const path = require("path");
const fs = require("fs");
const express = require("express");
const hbs = require("hbs");

const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Esmaeil Saleh",
    body: "I'm the body!",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name: "Esmaeil Saleh",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Helper",
    name: "Esmeil Saleh",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address",
    });
  }
        res.send ({
                Location: req.query.address,
                forcast: 'It will be sunny ALL day!'
        })
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }

  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    errorMessage: "No Article found",
    dot: ".",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Esmaeil Saleh",
    errorMessage: "Not Found!\n نیافتم!",
  });
});

app.listen(3001, () => {
  console.log("Server is up on port 3001.");
});
