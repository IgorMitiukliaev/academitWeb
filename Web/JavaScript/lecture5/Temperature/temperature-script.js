"use strict";
function convert() {
	var tempInput = Number(document.getElementById('tempValue').value);
	var tempUnit = document.getElementById('tempUnit').value;

	var tempValueF = 0;
	var tempValueC = 0;
	switch (tempUnit) {
		case "1":
			tempValueF = Math.round(tempInput * 1.8 + 32);
			tempValueC = tempInput;
			break;
		case "2":
			tempValueC = Math.round((tempInput - 32) / 1.8);
			tempValueF = tempInput;
			break;
	}

	var cell = document.getElementById('tempValueC');
	cell.innerHTML = tempValueC;
	cell = document.getElementById('tempValueF');
	cell.innerHTML = tempValueF;

	console.log(tempValueC);
	console.log(tempValueF);


}

