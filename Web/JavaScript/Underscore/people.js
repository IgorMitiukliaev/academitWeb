$(document).ready(function () {

	var people = [];
	people.push({name: "Terrance", age: 20, lastName: "Zimmerman"});
	people.push({name: "Steve", age: 30, lastName: "Walker"});
	people.push({name: "Leon", age: 16, lastName: "Downs"});
	people.push({name: "Keenan", age: 33, lastName: "Peterson"});
	people.push({name: "Agustin", age: 26, lastName: "Chandler"});
	people.push({name: "Garrett", age: 21, lastName: "Gibbs"});
	people.push({name: "Karlee", age: 39, lastName: "Kane"});
	people.push({name: "Veronica", age: 55, lastName: "Martinez"});
	people.push({name: "Melissa", age: 44, lastName: "Gomez"});
	people.push({name: "Joseph", age: 36, lastName: "Weber"});

	var avAge = _.chain(people)
		.pluck("age")
		.reduce(function (memo, num) {
			return memo + num;
		}, 0) / people.length;
	console.log(avAge);

	var filteredList = _.chain(people)
		.filter(function (p) {
			return p.age >= 20 && p.age <= 30;
		})
		.sortBy(function (person) {
			return person.age;
		})
		.value();
	console.log(filteredList);

	var newList = _.chain(people)
		.each(function (person) {
			return person.fullName = person.lastName + " " + person.name;
		})
		.value();
	console.log(newList);
});