// 10. 1 배열 만들기
// ES6에서 배열을 만드는 메서드 Array.of와 Array.from이 추가되었다.

console.log(`--------Array.of()-------`);

// Array.of 메서드는 Array 생성자와 유사하게 동작하지만 숫자 값 하나가 전달된 경우에도 특별하게 처리하지 않는다.

let items = Array.of(2);
console.log(items);

// 기존의 Array 생성자에서 숫자가 1개 전달되었을때 length가 2이고 비어있는 배열을 리턴했다면,
// Array.of 메서드는 배열 리터럴을 사용하는 것과 유사하게 동작한다.

console.log(`---------Array.from()-------`);

// 명확하고 깔끔하게 이터러블 / 유사 배열 객체를 배열로 변환하는 방법이다.

function doSomething() {
  let args = Array.from(arguments);
  console.log(args);
}
// 함수가 화살표 함수인 경우는 작동하지 않는다.
// 화살표 함수는 arguments가 없다.
console.log("기본 메서드 사용");
doSomething(1, 2, 3);

// 매핑 함수를 두번째 인자로 넣어서 각 값에 특정 연산을 수행하거나 최종 형태로의 변환 작업을 할 수 있다.

function mapping() {
  let args = Array.from(arguments, val => val + 2);
  console.log(args);
}

console.log("매핑 함수 사용");
mapping(1, 2, 3);

// 매핑 함수가 객체에서 수행된다면 매핑 함수의 this 값을 바인딩 하기 위해 세 번째 인자를 전달할 수 있다.

let helper = {
  diff: 11,
  add(value) {
    return value * this.diff;
  }
};

function translate() {
  return Array.from(arguments, helper.add, helper);
}

let numbers = translate(1, 2, 3);
console.log(numbers);

// 10.2 배열의 새로운 메서드

// find와 findIndex 메서드는 두 개의 인자를 받는다.
// 각각 콜백 함수와 콜백 함수 내 this로 사용할 값이며 콜백 함수에는 배열 요소와 배열 요소의 인덱스, 배열이 전달된다.
// find와 findIndex는 콜백 함수가 처음 true를 반환할 때 배열 검색을 멈춘다.

// find가 값을 반환하는데 반해 findIndex는 찾으려는 값의 인덱스를 반환한다.
console.log(`------find와 findIndex-------`);

let num = [25, 30, 35, 40, 45];
console.log(num.find(val => val > 30)); // 35
console.log(num.findIndex(val => val > 30)); //2
