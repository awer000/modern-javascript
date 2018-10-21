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

console.log(`--------내장 이터레이터---------`);
console.log(`--------컬렉션 이터레이터---------`);

// Array, Map, Set이라는 세 가지 타입의 컬렉션 객체가 있다.
// 모두 내부 콘텐츠를 탐색하도록 돕는 내장 이터레이터를 가진다.

// entries()는 값으로 키 값  쌍을 갖는 이터레이터를 반환한다.

let colors = ["red", "green", "blue"];
let tracking = new Set([1234, 5678, 9012]);
let data = new Map();

data.set("title", "Understanding ECMA6");
data.set("format", "ebook");

for (let entry of colors.entries()) {
  console.log(entry);
}

for (let entry of tracking.entries()) {
  console.log(entry);
}

for (let entry of data.entries()) {
  console.log(entry);
}

// value()는 값으로 컬렉션의 값을 갖는 이터레이터를 반환한다.

// for (let value of colors.values()) {
//   console.log(value);
// }

// 배열에는 왜 values 메서드가 적용이 안될까?

for (let value of tracking.values()) {
  console.log(value);
}

for (let value of data.values()) {
  console.log(value);
}

// keys 이터레이터는 각 키를 반환한다.

for (let key of colors.keys()) {
  console.log(key);
}

for (let key of tracking.keys()) {
  console.log(key);
}

for (let key of data.keys()) {
  console.log(key);
}

// 문서 엘리먼트의 컬렉션을 나타내는 NodeList 타입에도 이터레이터가 포함되어 사용할 수 있다.

// 전개 연산자를 사용하면 이터러블을 배열로 쉽게 바꿀 수 있다.

console.log(`--------이터레이터의 고급 기능---------`);

console.log(`--------이터레이터에 인자 전달하기---------`);

// next 메서드에 인자를 전달하면 그 인자가 제네레이터 yield 문의 값이 된다.

// 처음 next 호출은 특별한 경우로, 어떤 인자를 전달하더라도 그 인자는 손실된다.
// 할당문을 포함하는 yield문에서 표현식의 오른쪽은 첫 next() 호출에서 평가되고 표현식의 왼쪽은 함수 실행을 멈추고 있다가
// 두 번째 next() 호출에서 평가된다.

function* createIterator() {
  let first = yield 1;
  let second = yield first + 2;
  yield second + 3;
  return "hi";
}

let iterator3 = createIterator();

console.log(iterator3.next());
console.log(iterator3.next(3));
console.log(iterator3.next(4));
console.log(iterator3.next());

console.log(`--------이터레이터에 에러 발생 시키기---------`);

// 다시 수행될 때 에러를 발생시키도록 지시하는 throw() 메서드를 실행할 수 있다.

console.log(`--------제너레이터 위임하기---------`);

// 제너레이터는 yield와 *를 함께  사용하여 다른 이터레이터에 동작을 위임할 수 있다.
// 각  next 호출은 createNumberIterator()와 createColorIterator() 가 모두 비워질 때까지
// 적절한 이터레이터에 위임된다. 그러고 나서 마지막 yield가 실행되어 true가 반환된다.

function* createNumberIterator() {
  yield 1;
  yield 2;
}

function* createColorIterator() {
  yield "red";
  yield "green";
}

function* createCombinedIterator() {
  yield* createNumberIterator();
  yield* createColorIterator();
  yield true;
}

const iterator4 = createCombinedIterator();

console.log(iterator4.next());
console.log(iterator4.next());
console.log(iterator4.next());
console.log(iterator4.next());
console.log(iterator4.next());
console.log(iterator4.next());

console.log("------------------------------------");

// 제너레이터 위임값을 통해 제네레이터 반환 값을 더 잘 사용할 수 있다.
// 어떤 next 메서드에서도 3은 출력되지 않았다.
// 여기서는 createCombinedIterator 안에서만 존재한다.
// 필요에 따라 yield 문을 추가하여 그 값을 출력할 수는 있다.

function* createNumberIterator2() {
  yield 1;
  yield 2;
  return 3;
}

function* createRepeatingIterator2(count) {
  for (let i = 0; i < count; i++) {
    yield "repeat";
  }
}

function* createCombinedIterator2() {
  let result = yield* createNumberIterator2();
  yield* createRepeatingIterator2(result);
}

const iterator5 = createCombinedIterator2();

console.log(iterator5.next());
console.log(iterator5.next());
console.log(iterator5.next());
console.log(iterator5.next());
console.log(iterator5.next());
console.log(iterator5.next());

console.log("------------비동기 작업 수행-----------");

function run(taskDef) {
  let task = taskDef();
  let result = task.next();

  function step() {
    if (!result.done) {
      if (typeof result.value === "function") {
        result.value(function(err, data) {
          if (err) {
            result = task.throw(err);
            return;
          }
          result = task.next(data);
          step();
        });
      } else {
        result = task.next(result.value);
        step();
      }
    }
  }
  step();
}

run(function*() {
  let value = yield 1;
  console.log(value);

  value = yield value + 3;
  console.log(value);
});
