const cors = require('cors');
const express = require('express');
const app = express();

app.use(cors());
app.use(express.static('public'));

// get ip infos even if passing through a proxy like here
app.enable('trust proxy'); 

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function(request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get('/api/whoami', function(req, res, next){
  res.json({ipaddress: req.ip, language: req.headers['accept-language'], software: req.headers['user-agent']});
});

// 404 Not Found Middleware
app.use(function(req, res, next) {
  res.status(404)
    .type('text')
    .send('Not Found');
})

// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
