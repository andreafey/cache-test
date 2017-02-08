var express = require('express');

var app = express();
var MIN=1000;
var MAX=9999;

function getRandomInt() {
  return Math.floor(Math.random() * (MAX - MIN)) + MIN;
}

function createResponse(res) {
  res.type("json");
  output = {
    "rand": getRandomInt(),
    "headers": {
      "content-type": res.get("Content-Type"),
      "cache-control": res.get("Cache-Control"),
      "pragma": res.get("Pragma"),
      "expires": res.get("Expires")
    }
  };
  // console.log(output);
  return output;
}

app.get('/control', function(req, res) {
  res.set({
    "Cache-Control": "privacy"
  });
  res.send(createResponse(res));
});

app.get('/a', function(req, res) {
  res.set({
    "Cache-Control": "privacy, no-store"
  });
  res.send(createResponse(res));
});

app.get('/b', function(req, res) {
  res.set({
    "Cache-Control": "privacy, no-cache"
  });
  res.send(createResponse(res));
});

app.get('/c', function(req, res) {
  res.set({
    "Cache-Control": "privacy, no-store, must-revalidate"
  });
  res.send(createResponse(res));
});

app.get('/d', function(req, res) {
  res.set({
    "Cache-Control": "privacy, no-store, max-age=0"
  });
  res.send(createResponse(res));
});

app.use(express.static('public'));

app.listen(3001, function() {
  console.log('Listening on port 3001.')
});
