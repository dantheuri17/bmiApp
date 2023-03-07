const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const { readFileSync, writeFileSync } = require('fs')
const urlEncodedParser = bodyParser.urlencoded({extended: false})
const port = 3000


app.set('views', 'views')
app.set('view engine', 'hbs')
app.use(express.static('public'))

const bmiJSON = "bmiJSON.json"

let rawbmiJSON = readFileSync(bmiJSON)
let bmiData = JSON.parse(rawbmiJSON)

app.get('/', function(request, response) {
    response.render('bmiCalculator');
})

app.post('/calculateBMI', urlEncodedParser, function(request, response) {
    const height = request.body.height;
    const weight = request.body.weight;
    const newRecord = request.body;

    const calculatedBMI = weight/height**2; 

    const completeRecord = {...newRecord, bmi: calculatedBMI}

    bmiData.push(completeRecord)
    writeFileSync(bmiJSON, JSON.stringify(bmiData,null,2))

    
    return response.render('bmiResult', {completeRecord})

})


app.listen(port)
console.log('server is listening on port 3000')