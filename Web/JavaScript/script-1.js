"use strict";

function numCompareDescending(a, b) {
  return b - a;
}

function getEvenList(array) {
  return array.filter(function (e) {
    return (e % 2 === 0) & (e > 0);
  })
}

function getSum(array) {
  return array.reduce(function (sum, current) {
    return sum + current;
  }, 0)
}

function getSquareList(array) {
  return array.map(function (e) {
    return e * e;
  });
}

var array = [1, 2, 3, 3, 4, 5, 6, 7, 7, 9];
array.sort(numCompareDescending);
console.log("Сортировка по убыванию: " + array);
console.log('Первые 5 элементов массива: ' + array.slice(0, 5));
console.log('Последние 5 элементов массива: ' + array.slice(array.length - 5));
console.log("Сумма четных элементов массива: " + getSum(getEvenList(array)));


var numbers = [];
for (var i = 0; i <= 100; i++) {
  numbers.push(i);
}

var newArray = getSquareList(getEvenList(numbers));
console.log("Список квадратов четных элементов массива: " + newArray);
