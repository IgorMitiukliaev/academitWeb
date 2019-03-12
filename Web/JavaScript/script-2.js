"use strict";
var countries = [];

function getCitiesCount(e) {
	return e.countryCities.length;
}

function getCountriesMaxCitiesCount(countries) {
	var countriesTmpCopy = countries.slice(0);
	countriesTmpCopy.sort(function (e1, e2) {
		return getCitiesCount(e2) - getCitiesCount(e1);
	});
	var citiesMaxCount = getCitiesCount(countriesTmpCopy[0]);
	return countriesTmpCopy.filter(function (e) {
		return getCitiesCount(e) === citiesMaxCount;
	});
}

function getPopulation(e) {
	return e.countryCities.reduce(function (sum, current) {
		return sum + current.population;
	}, 0);
}

function createCountriesPopulationList(countries) {
	var objPopulation = {};
	countries.forEach(function (e) {
		objPopulation[e.countryName] = getPopulation(e);
	});
	return objPopulation;
}


countries.push({
	countryName: "Afghanistan",
	countryCities: [
		{name: "Kabul", population: 780000},
		{name: "Qandahar", population: 237500},
		{name: "Herat", population: 186800}]
});

countries.push({
	countryName: "Belarus",
	countryCities: [
		{name: "Minsk", population: 1674000},
		{name: "Gomel", population: 475000},
		{name: "Mogiljov", population: 356000},
		{name: "Vitebsk", population: 340000},
		{name: "Grodno", population: 302000},
		{name: "Brest", population: 286000},
		{name: "Bobruisk", population: 221000},
		{name: "Baranovitchi", population: 167000},
		{name: "Borisov", population: 151000}]
});

countries.push({
	countryName: "Australia",
	countryCities: [
		{name: "Sydney", population: 3276207},
		{name: "Melbourne", population: 2865329},
		{name: "Brisbane", population: 1291117},
		{name: "Perth", population: 1096829},
		{name: "Adelaide", population: 978100},
		{name: "Canberra", population: 322723}]
});

countries.push({
	countryName: "France",
	countryCities: [
		{name: "Paris", population: 2125246},
		{name: "Marseille", population: 798430},
		{name: "Lyon", population: 445452},
		{name: "Toulouse", population: 390350},
		{name: "Nice", population: 342738},
		{name: "Nantes", population: 270251},
		{name: "Strasbourg", population: 264115},
		{name: "Montpellier", population: 225392},
		{name: "Bordeaux", population: 215363},
		{name: "Rennes", population: 206229},
		{name: "Le Havre", population: 190905},
		{name: "Reims", population: 187206}]
});

console.log(getCountriesMaxCitiesCount(countries));
console.log(countries); // проверяю, что исходный массив не отсортирован при выполнении getCountriesMaxCitiesCount
console.log(createCountriesPopulationList(countries));
