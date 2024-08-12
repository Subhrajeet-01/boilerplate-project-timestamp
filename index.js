// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

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

// First use the end point "/api/:date?" and use the (req,res) function to get the user input date from req.params.date . 
// Then, check if a valid date is given in params or not.
// If (!isNaN(req.params.date)) === True then date is in unix format in string. i.e date = "1451001600000"
// So, Convert the string into integer using ParseInt.
// Otherwise execute else block where date is in string format. i.e date = "2015-12-25".
// If req.params.date === Null .Then, Set date = Current date .
// After that convert the date to Unix and utc format .
// if unix == null then return error : Invalid date.
// At last return the unix, utc in json format.

//My Code Starts Here.

app.get("/api/:date?", function (req,res) {
  let date;
  // console.log(req.params.date);
  if(req.params.date){
    if(!isNaN(req.params.date)){
      date = new Date(parseInt(req.params.date))
    } else { 
      date = new Date(req.params.date)
    }
  } else {
    date = new Date();
  }

  const unix = date.getTime();
  console.log(unix);
  const utc = date.toUTCString();
  if (!unix){
    res.json({error : "Invalid Date"});
  }
  res.json({
    unix: unix,
    utc: utc
  })
  // console.log("unix: "+ unix, "utc: " + utc);
})
//My Code Ends Here.

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
