const express       = require('express');
const bodyParser    = require('body-parser');
const path          = require('path');
const request       = require('request')
const NSWpostcodes  = require('./geojson/NSW_PC_100pc_TOPO.json')

require('dotenv').config() //so we can make use of .env files


const app           = express();

app.use(express.static(path.join(__dirname, 'dist')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/dist/index.html')
})

app.get('/postcodes', (req, res) => {
  console.log(req.query)
  switch(req.query.state){
    case 'nsw':
      console.log('sending nsw map')
      res.json(NSWpostcodes)
  }
})

app.get('/getCOVIDdata', function (req, res) {
  request('https://data.nsw.gov.au/data/api/3/action/datastore_search?resource_id=21304414-1ff1-4243-a5d2-f52778048b29&limit=100000000', function (error, response, body) {
    if (!error && response.statusCode == 200) {
      let resJSON = JSON.parse(body)
      let caseData = {}

      resJSON.result.records.forEach(cvCase => {
        if(cvCase.postcode===0 || cvCase.postcode===null) return;
        if(!caseData.hasOwnProperty(cvCase.postcode)) {
          caseData[cvCase.postcode] = [cvCase.notification_date]
        } else if(caseData.hasOwnProperty(cvCase.postcode)) {
          caseData[cvCase.postcode].push(cvCase.notification_date)
        }
      })

      res.json(caseData)
    }
    if (error) {
      console.log(error)
    }
  })
});

var listener = app.listen(process.env.PORT||3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
}); 