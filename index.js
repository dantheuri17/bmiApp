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

// let bmiJSON = "bmi.json"

// let rawBMI = readFileSync(bmiJSON)
// let BMI = JSON.parse(rawBMI)

// app.use(express.json())
// app.use(express.urlencoded({extended: true}))
// app.use(urlEncoder)

app.get('/', function(request, response) {
    response.render('home', {name: 'John Doe'})

})

app.get('/contacts', function(request, response) {
    response.render('contact_us');
})

const data = [];
app.post('/calculateBMI', urlEncodedParser, function(request, response) {
    const height = request.body.height;
    const weight = request.body.weight;
    
    
    response.end(`Height: ${height} Weight: ${weight}`)


    bmiData.push(request.body)
    writeFileSync(bmiJSON, JSON.stringify(bmiData,null,2))



})


app.listen(port)
console.log('server is listening on port 3000')