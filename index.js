const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const { readFileSync, writeFileSync } = require("fs");
const urlEncodedParser = bodyParser.urlencoded({ extended: false });
const port = 3000;

app.set("views", "views");
app.set("view engine", "hbs");
app.use(express.static("public"));

const bmiJSON = "bmiJSON.json";

let rawbmiJSON = readFileSync(bmiJSON);
let bmiData = JSON.parse(rawbmiJSON);

app.get("/", function (request, response) {
	response.render("bmiCalculator");
});

app.post("/calculateBMI", urlEncodedParser, function (request, response) {
	const height = request.body.height;
	const weight = request.body.weight;
	const newRecord = request.body;
	let explainBMI = "";

	const calculatedBMI = weight / height ** 2;

	const completeRecord = { ...newRecord, bmi: calculatedBMI };

	bmiData.push(completeRecord);
	writeFileSync(bmiJSON, JSON.stringify(bmiData, null, 2));

	if (completeRecord.bmi > 0) {
		if (completeRecord.bmi >= 25 && completeRecord.bmi <= 29.9 ) explainBMI = "Overweight"; //
		else if (completeRecord.bmi > 18.5 && completeRecord.bmi <=24.9) explainBMI = "Normal";
		else if (completeRecord.bmi < 18.5) explainBMI = "Underweight";
        else if (completeRecord.bmi >= 30) explainBMI = "Obese"
	}

	return response.render("bmiResult", { completeRecord, explainBMI });
});

244.74 + 346.32;

app.get("/reports", function (request, response) {
	let sum = 0;
	let average = 0;

	for (let i = 0; i < bmiData.length; i++) {
		sum += bmiData[i].bmi;
	}

	console.log(sum);
	console.log(bmiData.length);

	average = sum / bmiData.length;

    if (average > 0) {
			if (average >= 25 && average <= 29.9)
				explainAverage = "Overweight"; //
			else if (average > 18.5 && average <= 24.9)
				explainAverage = "Normal";
			else if (average < 18.5) explainAverage = "Underweight";
			else if (average >= 30) explainAverage = "Obese";
		}

	return response.render("report", { bmiData, average, explainAverage });
});

app.listen(port);
console.log("server is listening on port 3000");
