"use strict";
var countries = [];

function getCitiesCount(e) {
  return e.country_cities.length;
}

function getCountriesMaxCitiesCount(countries) {
  var a = countries.slice(0);
  a.sort(function (e1, e2) {
    return getCitiesCount(e2) - getCitiesCount(e1);
  });
  var citiesMaxCount = getCitiesCount(a[0]);
  return a.filter(function (e) {
    return getCitiesCount(e) === citiesMaxCount;
  });
}

function getPopulation(e) {
  return e.country_cities.reduce(function (sum, current) {
    return sum + current.population;
  }, 0);
}


countries.push({
  country_name: "Afghanistan",
  country_cities: [
    {name: "Kabul", population: 780000},
    {name: "Qandahar", population: 237500},
    {name: "Herat", population: 186800}]
});

countries.push({
  country_name: "Belarus",
  country_cities: [
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
  country_name: "Australia",
  country_cities: [
    {name: "Sydney", population: 3276207},
    {name: "Melbourne", population: 2865329},
    {name: "Brisbane", population: 1291117},
    {name: "Perth", population: 1096829},
    {name: "Adelaide", population: 978100},
    {name: "Canberra", population: 322723}]
});


console.log(getCountriesMaxCitiesCount(countries));
console.log(countries);

var obj_population = {};
for (var i = 0; i < countries.length; i++) {
  obj_population[countries[i].country_name] = getPopulation(countries[i]);
}
console.log(obj_population);
