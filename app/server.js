const express       = require('express');
const bodyParser    = require('body-parser');
const path          = require('path');
const request       = require('request')
const NSWpostcodes  = require('./geojson/NSW_PC_100pc_TOPO.json')
const VICLGAs       = require('./geojson/VIC_LGA_100pc_TOPO.json')
const QLDLGAs       = require('./geojson/QLD_LGA_100pc_TOPO.json')
const WALGAs        = require('./geojson/WA_LGA_100pc_TOPO.json')


const app           = express();

app.use(express.static(path.join(__dirname, 'dist')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/dist/index.html')
})

app.get('/maps', (req, res) => {
  // console.log(req.query)
  switch(req.query.state){
    case 'nsw':
      // console.log('sending nsw map')
      res.json(NSWpostcodes)
      break;
    case 'vic':
      // console.log('sending vic map')
      res.json(VICLGAs)
      break;
    case 'qld':
      res.json(QLDLGAs)
      break
    case 'wa':
      res.json(WALGAs)
      break
  }
})

app.get('/getCOVIDdata', function (req, res) {
  // console.log(req.query.state)
  switch(req.query.state){
    case 'nsw':
      request('https://data.nsw.gov.au/data/api/3/action/datastore_search?resource_id=21304414-1ff1-4243-a5d2-f52778048b29&limit=100000000', function (error, response, body) {
        if (!error && response.statusCode == 200) {
          let resJSON = JSON.parse(body)
          let caseData = {}

          resJSON.result.records.forEach(cvCase => {
            if(cvCase.postcode===0 || cvCase.postcode===null) return;
            if(!caseData.hasOwnProperty(cvCase.postcode)) {
              caseData[cvCase.postcode] = 1
            } else if(caseData.hasOwnProperty(cvCase.postcode)) {
              caseData[cvCase.postcode] += 1
            }
          })

          res.json(caseData)
        }
        if (error) {
          console.log(error)
        }
      })
      break;
    case 'vic':
      request('https://interactive.guim.co.uk/covidfeeds/victoria.json', function (error, response, body) {
        if (!error && response.statusCode == 200) {
          let resJSON = JSON.parse(body)
          let caseData = {}

          resJSON.forEach(area => {
            caseData[area.place] = area.count
          })

          // console.log(caseData)
          res.json(caseData)
        }
        if (error) {
          console.log(error)
        }
      })
      break;
    case 'qld':
      request('https://interactive.guim.co.uk/covidfeeds/queensland.json', function (error, response, body) {
        if (!error && response.statusCode == 200) {
          let resJSON = JSON.parse(body)
          let caseData = {}

          // console.log(resJSON)

          resJSON.forEach(area => {
            caseData[area.place.split(' ').filter((word) => {return !word.match(/\(/)}).map((word) => {return word.toLowerCase()}).join(' ')] = parseInt(area.count)
          })

          delete caseData.total
          // console.log(caseData)
          res.json(caseData)
        }
        if (error) {
          console.log(error)
        }
      })
      break;
      case 'wa':
        request('https://interactive.guim.co.uk/covidfeeds/wa.json', function (error, response, body) {
          if (!error && response.statusCode == 200) {
            let resJSON = JSON.parse(body)
            let caseData = {}
  
            // console.log(resJSON)
  
            resJSON.forEach(area => {
              caseData[area.place] = parseInt(area.count)
            })
  
            // console.log(caseData)
            res.json(caseData)
          }
          if (error) {
            console.log(error)
          }
        })
        break;
  }
})
  

var listener = app.listen(process.env.PORT||3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
}); 