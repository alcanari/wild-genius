// server.js
// where your node app starts

// init project
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var Genius = require('node-genius');
var geniusClient = new Genius(process.env.ACCESS_TOKEN);

// Simple in-memory store for now
var tracks = [];

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get("/tracks", function (request, response) {
  response.send(tracks);
});

app.post("/tracks", function (request, response) {
  tracks=[];
  geniusClient.search(request.body.track, function (error, results) {
    if(error){ console.log(error); }
    else {
      results=JSON.parse(results);
      if(results.response.hits.length){
        results.response.hits.forEach(function(hit){
          tracks.push({title: hit.result.full_title, url: hit.result.url});
        });
      } else {
        tracks.push({title: "No results found", url: "/"});
      }
      response.redirect("/");
    }
  });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
