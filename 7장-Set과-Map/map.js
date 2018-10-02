//ES6 Map은 타입은 순서가 있는 키와 값 쌍의 리스트이고,
// 그 키와 값은 어떤 타입이든 될 수 있다.

// 객체 프로퍼티는 항상 문자열로 값이 강제 변환되기 때문에
// 객체 프로퍼티를 키로 사용하는 방식과는 매우 큰 차이가 있다.

// set 메서드로 키와 값을 전달하여 추가할 수 있고
// get 메서드로 키를 전달하여 값을 얻을 수 있다.

let map = new Map();

map.set(2015, "3년전입니다.");
map.set("hi", "안녕!");

console.log(map.get(2015));
console.log(map.get("hi"));

// 객체를 키로 사용할 수도 있다.

let mapObj = new Map(),
  key1 = {},
  key2 = {};

mapObj.set(key1, 5);
mapObj.set(key2, "33");

console.log(mapObj.get(key1));
console.log(mapObj.get(key2));

// Set의 메서드와 공통적으로, has, delete, size 메서드를 사용할 수 있다.

// Map 생성자에 배열을 전달하여 Map을 초기화 할 수 있다.
// 배열의 각 요소는 배열이다. 각 배열은 키, 값으로 이루어져 있다.

let mapArr = new Map([[1, "하나"], [2, "둘"], [3, "셋"]]);

console.log(mapArr.has(1)); // true
console.log(mapArr.get(2)); // 둘
console.log(mapArr.size); // 3

// forEach 메서드를 사용할 수 있다.
// 인자로 사용하는 함수의 인자는 차례대로 값, 키, 현재 사용하는 Map이다.
// 전체적으로 Set에서와 동일하게 동작한다.

mapArr.forEach((value, key, map) => {
  console.log(value, key);
  console.log(map);
});

// Weak Map은 객체의 약한 참조를 저장하는 방식.
// 모든 키는 객체여야 함.
// Weak Map 바깥에서 Weak Map 키에 대한 참조가 사라지면, 그에 해당하는 키 값 쌍은 제거된다.
// Weak Map 키만 약한 참조이고 값은 가비지 컬렉션 되지 않는다.

