"use strict";

function numCompareDescending(a, b) {
  return b - a;
}

function getEvenList(array) {
  return array.filter(function (e) {
    return !(e & 1) & (e > 0);
  })
}

function getSum(array) {
  let sum = 0;
  array.forEach(function (e) {
    sum += e;
  });
  return sum;
}

function getSquareList(array) {
  let a = [];
  array.forEach(function (e) {
    a.push(e * e)
  });
  return a;
}

let array = [1, 2, 3, 3, 4, 5, 6, 7, 7, 9];
array.sort(numCompareDescending);
console.log("Сортировка по убыванию: " + array);
console.log('Первые 5 элементов массива: ' + array.slice(0, 5));
console.log('Последние 5 элементов массива: ' + array.slice(array.length - 5, array.length));
console.log("Сумма четных элементов массива: " + getSum(getEvenList(array)));


let numbers = [];
for (let i = 0; i <= 100; i++) {
  numbers.push(i);
}

let newArray = getSquareList(getEvenList(numbers));
console.log("Список квадратов четных элементов массива: " + newArray);
