const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res) => {
  const query = req.body.cityName;
  const apiKey = "1e6c96d94ea15b440f14579c5578898f";
  const units = "metric";
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    query +
    "&appid=" +
    apiKey +
    "&units=" +
    units +
    "";
  https.get(url, (resp) => {
    console.log(resp.statusCode);

    resp.on("data", (data) => {
      const weatherData = JSON.parse(data);
      // console.log(weatherData);
      // const object = {
      //     name:"Sarthak",
      //     favouriteFood:"Momos"
      // }
      // console.log(JSON.stringify(object));
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      res.write("<p>The weather is currently " + weatherDescription + "</p>");
      res.write(
        "<h1>The Temprature in " +
          query +
          " is " +
          temp +
          " degrees celsius.</h1>"
      );
      res.write("<img src=" + imageURL + ">");
      res.send();
    });
  });
});

app.listen(9000, () => {
  console.log("Server started on port 9000");
});

// app.listen(9000, ()=>{
//     console.log("Server started on port 9000");
// });

// app.get("/", (req,res)=>{
//     console.log("Server started on port 9000");
// });

// const JY=()=>{
//     console.log("Server started on port 9000");
// };
