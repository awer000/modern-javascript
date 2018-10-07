const arr = [1, 2, 3];
const iterator = arr[Symbol.iterator]();

console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());

// 제너레이터는 이터레이터를 반환하는 함수
// 제너레이터는 함수 표현식으로도 사용 가능하다.
console.log(`------제너레이터란?----------`);
function* createrIterator() {
  yield 1;
  yield 2;
  yield 3;
}

let iterator2 = createrIterator();

console.log(iterator2.next());
console.log(iterator2.next());
console.log(iterator2.next());
console.log(iterator2.next());

console.log(`------이터러블이란?----------`);

// 이터러블은 Symbol.iterator 프로퍼티를 가진 객체.
// 주어진 객체의 이터레이터를 반환하는 함수를 명시한다.
// for of 문은 반복문이 실행될 때마다 이터러블의 next()를 호출하고 반환된 객체의 value를 변수에 저장한다.
// 이 반복문은 반환된 객체의 done 프로퍼티가 true일 때까지 이러한 과정을 지속한다.

let values = [1, 2, 3];

for (value of values) {
  console.log(value);
}

// for of문의 동작법
// 1. 이터레이터를 얻기 위해 values 배열의 Symbol.iterator 메서드를 호출한다.
// 2. iterator.next()가 호출된다.
// 3. 이터레이터의 반환된 객체의 value 프로퍼티를 읽어 num에 할당한다.

// 단순한 값의 순회라면 for of문을 사용하는 것이 좋다.

console.log(`------객체가 이터러블인지 확인하는 방법----------`);

function isIterable(object) {
  return typeof object[Symbol.iterator] === "function";
}
console.log(isIterable([1, 2, 3]));
console.log(isIterable("Hello"));
console.log(isIterable(new Map()));
console.log(isIterable(new Set()));
console.log(isIterable(new WeakMap()));
console.log(isIterable(new WeakSet()));

console.log(`------이터러블 만들기----------`);

// 제네레이터를 포함하는 Symbol.iterator 프로퍼티를 만들어 객체를 이터러블로 만들 수 있다.

let collection = {
  items: [],
  *[Symbol.iterator]() {
    for (let item of this.items) {
      yield item;
    }
  }
};

collection.items.push(1);
collection.items.push(2);
collection.items.push(3);

for (let x of collection) {
  console.log(x);
}
