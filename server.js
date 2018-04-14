// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// change unix to utc and vice versa
app.get('/api/timestamp/:date_string', (req, res) => {
  let json = {};
  let date_string = req.params.date_string;
  if (!isNaN(date_string)) {
    json.unix = parseInt(date_string);
    json.utc = new Date(parseInt(date_string)).toUTCString();
  }
  else if (new Date(date_string).getTime() <= 0 || isNaN(new Date(date_string).getTime())) {
    res.send('Invalid time');
  }
  else {
    json.unix = new Date(date_string).getTime()/1000;
    json.utc = new Date(date_string).toUTCString();
  }
  res.json(json);
})

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});