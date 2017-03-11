const express = require('express');
const axios = require('axios');
const moment = require('moment');

const PORT = process.env.PORT || 3500;

//Create our app
var app = express();

app.use(function (req, res, next) {
  if (req.headers['x-forwarded-proto'] === 'https') {
    res.redirect('http://' + req.hostname + req.url);
  } else {
    next();
  }
});

app.use(express.static('public'));

app.get('/fights', (req, res) => {
  var fights = [];
  axios.get('http://ufc-data-api.ufc.com/api/v3/iphone/events').then(function (data) {
    if (!data) {
      throw new Error('unable to retrieve fights');
    } else {
      var today = new Date();
      today = moment.utc(today).format();
      //console.log(today + ' ' + 'event_dategmt ' + data[i].event_dategmt);
      var obj;
      for (var key in data) {
        var obj = data[key];
        }
      console.log('dates ' + today + ' ' + obj[39].event_dategmt);
      for (var i = 0; i < obj.length; i++) {
        if (today <= obj[i].event_dategmt) {
           fights.push({
             id: obj[i].id,
             date: obj[i].event_dategmt,
             title: obj[i].base_title,
             title_tag: obj[i].title_tag_line,
             img: obj[i].feature_image
           })
         }
       }
       console.log('fight title',fights[0].title);
       res.status(200).send(fights);
     }
   }).catch(function (err) {
     console.log('err in func', err);
   });
});

app.listen(PORT, () => {
  console.log('Express server is up on port ' + PORT);
});
