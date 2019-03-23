"use strict";
var tempValue = [];
var tempUnit;
var KELVIN = 273.15;

function convert() {
	var tempInput = document.getElementById('tempValue').value;

	tempUnit = document.getElementById('tempUnit').value;
	if (tempInput === "" || isNaN(Number(tempInput))) {
		showResults(true);
		return;
	}
	tempInput = Number(tempInput);
	switch (tempUnit) {
		case "C":
			tempValue[0] = tempInput;
			tempValue[1] = tempValue[0] * 1.8 + 32;
			tempValue[2] = tempValue[0] + KELVIN;
			break;
		case "F":
			tempValue[1] = tempInput;
			tempValue[0] = (tempValue[1] - 32) / 1.8;
			tempValue[2] = tempValue[0] + KELVIN;
			break;
		case "K":
			tempValue[2] = tempInput;
			tempValue[0] = tempValue[2] - KELVIN;
			tempValue[1] = tempValue[0] * 1.8 + 32;
			break;
	}
	showResults(false);
}

function showResults(e) {
	if (e) {
		document.getElementById('tempValue').style.borderColor = "red";
		document.getElementById('results').style.display = "none";
	} else {
		document.getElementById('tempValue').style.borderColor = "inherit";

		var el = document.getElementsByClassName("resultValue");
		for (var i = 0; i < el.length; i++) {
			el[i].innerHTML = String(Math.round(tempValue[i] * 10) / 10 + (i < 2 ? String.fromCharCode(176) : "") + el[i].getAttribute('id'));
			el[i].style.display = "block";
		}
		document.getElementById(tempUnit).style.display = "none";
		document.getElementById('results').style.display = "block";
	}
}