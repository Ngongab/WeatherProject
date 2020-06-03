
const express = require('express');
const https = require('https');
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extented: true}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {
  const query = req.body.cityName;
  const apiKey = "ff949e2e0b8da1cecdf31de1434be3c8";
  const unit = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid=" + apiKey + "&units=" + unit;

  https.get(url, function(response) {
    console.log(response.statusCode);

    response.on("data", function(data){
      const weatherData = JSON.parse(data);
      console.log(weatherData);
      console.log(JSON.parse(data));
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;

      res.write("<p>The weather is currently " + weatherDescription + "</p>");
      res.write("<h1>The Tempreature in " + query + " is " + temp + " degrees celcius</h1>");
      res.send();
    });
  });
});

app.listen(3000, function() {
  console.log('Your server has started on port 3000');
});
