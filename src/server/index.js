let path = require("path");
const dotnev = require("dotenv");
const express = require("express");
const bodyParser = require("body-parser");
const mockAPIResponse = require("./mockAPI.js");
const cors = require("cors");
const aylien = require("aylien_textapi");
const port = 3000;
const respdata = {};
dotnev.config({ path: "../../.env" });
const distPath = path.join(__dirname, "..//..//dist");

// set aylien API credentias
let textapi = new aylien({
  application_id: process.env.API_ID,
  application_key: process.env.API_KEY,
});


//Create instance of server
const app = express();

//Configuring express to use body-parser as middle-ware.
app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

//To give server info about what to serve
app.use(express.static(distPath));

// get content
app.get("/", function (req, res) {
  res.sendFile(path.resolve(distPath, "index.html"));
});

// designates what port the app will listen to for incoming requests
app.listen(port, function () {
  console.log(`App is running on ${port}`);
});

app.post("/send", (req, res) => {
  console.log("::: Post:::");
  console.log(req.body.url);

  if (textapi) {
    textapi.sentiment(
      {
        text: req.body.url,
      },
      function (error, response) {
        if (error === null) {
          respdata.polarity = response.polarity;
          respdata.polarityConfidence = response.polarity_confidence;
        }
      }
    );
  }
  res.send({
    respdata,
  });
});

app.get("/test", function (req, res) {
  res.send(mockAPIResponse);
});
